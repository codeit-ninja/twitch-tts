import { StaticAuthProvider, type AccessToken } from "@twurple/auth";
import { ApiClient } from "@twurple/api";
import { prisma } from "./prisma";
import { CLIENT_ID } from "$env/static/private";
import { error } from "@sveltejs/kit";
import { getUserByToken } from "./user";

export const createClient = ( accessToken: string ) => new ApiClient({ authProvider: new StaticAuthProvider( CLIENT_ID, accessToken ) })

export const getTwitchUser = async ( token: string,  ) => {
    return createClient( token ).users.getAuthenticatedUser( token )
} 

export const saveTokenData = async ( tokenData: AccessToken ) => {
    const user = await getUserByToken( tokenData.accessToken );

    if( ! user ) {
        const client = createClient( tokenData.accessToken );
        const tokenInfo = await client.getTokenInfo();
        
        // Something went wrong, there is no user ID !
        if( ! tokenInfo.userId ) {
            return error(500, 'Could not authenticate')
        }

        const user = await client.users.getAuthenticatedUser( tokenInfo.userId, true );

        console.log({...user})
        // prisma.user.create({
        //     data: {

        //     }
        // })
    }
}