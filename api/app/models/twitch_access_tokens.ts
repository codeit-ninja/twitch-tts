import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, beforeSave, belongsTo, column } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations';

export default class TwitchAccessTokens extends BaseModel {
    @column({ isPrimary: true })
    declare id: number

    @belongsTo(() => User)
    declare user: BelongsTo<typeof User>;

    @column()
    declare userId: number;

    @column()
    declare accessToken: string;

    @column()
    declare refreshToken: string;

    @column()
    declare expiresIn: number;

    @column()
    declare expiresAt: Date;

    @column()
    declare scope: string[];

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime

    @beforeCreate()
    static async hashPassword(twitchAccessTokens: TwitchAccessTokens) {
        // @ts-ignore
        twitchAccessTokens.scope = JSON.stringify( twitchAccessTokens.scope );
    }
}