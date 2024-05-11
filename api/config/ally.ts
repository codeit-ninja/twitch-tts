import env from '#start/env'
import { defineConfig } from '@adonisjs/ally'
import { twitch } from '@rlanz/ally-twitch'

const allyConfig = defineConfig({
    twitch: twitch({
        clientId: env.get('TWITCH_CLIENT_ID'),
        clientSecret: env.get('TWITCH_CLIENT_SECRET'),
        callbackUrl: env.get('TWITCH_CALLBACK_URL'),
        scopes: [
            "channel:manage:redemptions",
            "channel:moderate",
            "channel:read:redemptions",
            "chat:edit",
            "chat:read",
            "user:read:chat",
            "user:read:email",
            "user:write:chat",
            "whispers:read"
        ]
    }),
})

export default allyConfig

declare module '@adonisjs/ally/types' {
    interface SocialProviders extends InferSocialProviders<typeof allyConfig> { }
}