import { CLIENT_ID, REDIRECT_URI } from "$env/static/private";
import { getTwitchUser } from "$lib/server/twitch";
import { createUserByToken, getCurrentUser, getUserByEmail, updateTokenForUser } from "$lib/server/user";
import { redirect, type Handle } from "@sveltejs/kit";
import type { AccessToken } from "@twurple/auth";

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
                'channel:moderate'
            ].join(' ')
        })

        return redirect(302, `https://id.twitch.tv/oauth2/authorize?${params.toString()}`)
    }

    const twitchUser = await getTwitchUser( token.accessToken );
    const user = await getUserByEmail( twitchUser.email! );

    if( ! user ) {
        await createUserByToken( token )
    } else {
        await updateTokenForUser( user, token );
    }

    event.locals.user = await getCurrentUser( token.accessToken );
    
    return await resolve( event );
}