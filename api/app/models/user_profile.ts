import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class UserProfile extends BaseModel {
    @column({ isPrimary: true })
    declare twitchId: string

    @belongsTo(() => User)
    declare user: BelongsTo<typeof User>;

    @column()
    declare userId: number;

    @column()
    declare name: string

    @column()
    declare nickName: string

    @column()
    declare avatarUrl: string

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime
}