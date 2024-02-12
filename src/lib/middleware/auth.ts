import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from "$env/static/private";
import { getTwitchUser } from "$lib/server/twitch";
import { createUserByToken, getCurrentUser, getUserByEmail, updateOrCreateToken, updateTokenForUser } from "$lib/server/user";
import { redirect, type Handle } from "@sveltejs/kit";
import { RefreshingAuthProvider, type AccessToken } from "@twurple/auth";

export const auth: Handle = async ({ event, resolve }) => {
    const cookie = event.cookies.get( 'token' );
    const token = cookie ? JSON.parse( cookie ) as AccessToken : null;

    if( ! token ) {
        if( event.route.id?.startsWith('/auth') ) {
            return await resolve( event );
        }
        
        const params = new URLSearchParams({
            response_type: 'code',
            client_id: CLIENT_ID,
            redirect_uri: REDIRECT_URI,
            scope: [
                'user:read:email',
                'chat:read',
                'chat:edit',
                'user:read:chat',
                'user:write:chat',
                'whispers:read',
                'channel:moderate',
                'channel:read:redemptions',
                'channel:manage:redemptions'
            ].join(' ')
        })

        return redirect( 302, `https://id.twitch.tv/oauth2/authorize?${ params.toString() }` )
    }

    // const authProvider = new RefreshingAuthProvider(
    //     {
    //         clientId: CLIENT_ID,
    //         clientSecret: CLIENT_SECRET
    //     }
    // );
    
    // await authProvider.addUser( token.accessToken, token );

    // const newTokenData = await authProvider.refreshAccessTokenForUser( token.accessToken );
    const twitchUser = await getTwitchUser( token.accessToken );
    const user = await getUserByEmail( twitchUser.email! );

    await updateOrCreateToken( user, token );
    
    event.locals.user = await getCurrentUser( token.accessToken );
    event.locals.twitchUserId = twitchUser.id;
    
    return await resolve( event );
}