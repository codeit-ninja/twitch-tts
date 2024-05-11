import type { HttpContext } from '@adonisjs/core/http'
import User from "#models/user";
import UserProfile from '#models/user_profile';
import TwitchAccessTokens from '#models/twitch_access_tokens';

export default class SessionController {
    async redirect( { ally }: HttpContext ) {
        return ally.use( 'twitch' ).stateless().redirect()
    }

    async authenticate( { ally }: HttpContext ) {
        const twitch = ally.use( 'twitch' ).stateless();

        if( twitch.accessDenied() ) {
            return 'Login cancelled';
        }
    
        if( twitch.stateMisMatch() ) {
            return 'We are unable to verify the request. Please try again';
        }
    
        if( twitch.hasError() ) {
            return twitch.getError();
        }

        let { id, email, avatarUrl, name, nickName, token } = await twitch.user();
        let user = await User.findBy( 'email', email );

        if( ! user ) {
            const createdUser = await User.create( { email } )

            await UserProfile.create({
                twitchId: id,
                avatarUrl,
                name,
                nickName,
                userId: createdUser.id,
            })
            
            await TwitchAccessTokens.create({
                accessToken: token.token,
                expiresIn: token.expiresIn,
                expiresAt: token.expiresAt,
                refreshToken: token.refreshToken,
                scope: token.scope,
                userId: createdUser.id
            })
        }

        user = await User.findByOrFail( 'email', email );
        
        await user.load('profile');
        await user.load('twitchAccessTokens');

        const accessToken = await User.accessTokens.create(user);

        return {
            type: 'bearer',
            value: accessToken.value!.release()
        }
    }

    async me({ auth }: HttpContext) {
        const user = await User.findOrFail( auth.user?.id );

        await user.load('twitchAccessTokens');
        await user.load('profile');

        return user;
    }
}