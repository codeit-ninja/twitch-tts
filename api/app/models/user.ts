import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import Profile from './user_profile.js'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import TwitchAccessTokens from './twitch_access_tokens.js'

export default class User extends BaseModel {
    @column({ isPrimary: true })
    declare id: number

    @column()
    declare email: string

    @hasOne(() => Profile)
    declare profile: HasOne<typeof Profile>

    @hasOne(() => TwitchAccessTokens)
    declare twitchAccessTokens: HasOne<typeof TwitchAccessTokens>
    
    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime | null

    static accessTokens = DbAccessTokensProvider.forModel(User)
}