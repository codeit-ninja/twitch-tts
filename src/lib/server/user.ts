import type { User, UserTwitchTokenData } from "@prisma/client";
import { prisma } from "./prisma"
import type { AccessToken } from "@twurple/auth";
import { getTwitchUser } from "./twitch";
import { error } from "@sveltejs/kit";

/**
 * Get current user based on token
 * Token is stored in a token cookie
 * 
 * @param token 
 */
async function getUser( token: string, throwErr: true ): Promise<UserTwitchTokenData & { user: User }>
async function getUser( token: string, throwErr: false ): Promise<UserTwitchTokenData & { user: User } | null>
async function getUser( token: string, throwErr = true ) {
    return await prisma.userTwitchTokenData[throwErr ? 'findFirstOrThrow' : 'findFirst']({
        where: {
            accessToken: token
        },
        include: {
            user: true
        }
    })
}

export const getCurrentUser = async ( token: string ) => {
    return await getUser( token, true )
}

export const getUserByToken = async ( token: string ) => {
    return await getUser( token, false );
}

export const getUserByEmail = async ( email: string ) => {
    return await prisma.user.findFirst({
        where: {
            email
        },
        include: {
            UserTwitchTokenData: true
        }
    })
}

export const createUserByToken = async ( { accessToken, expiresIn, obtainmentTimestamp, refreshToken, scope }: AccessToken ) => {
    const twitchUser = await getTwitchUser( accessToken );

    if( ! twitchUser.email ) {
        error( 404, 'Could not link your twitch email.' );
    }

    return await prisma.userTwitchTokenData.create({
        data: {
            accessToken, 
            expiresIn, 
            obtainmentTimestamp, 
            refreshToken, 
            scope,
            user: {
                create: {
                    email: twitchUser.email,
                    password: 'NULL',
                    username: twitchUser.displayName
                }
            }
        },
        include: {
            user: true
        }
    })
}

export const updateTokenForUser = async ( { email, id }: User, { accessToken, expiresIn, obtainmentTimestamp, refreshToken, scope }: AccessToken ) => {
    return await prisma.userTwitchTokenData.update({
        where: {
            userId: id
        },
        data: {
            accessToken, 
            expiresIn, 
            obtainmentTimestamp, 
            refreshToken, 
            scope,
            user: { connect: { email } }
        },
    })
}