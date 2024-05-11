import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
    protected tableName = 'user_profiles'

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.string('twitch_id').unique().notNullable().primary()
            table
                .integer('user_id')
                .notNullable()
                .unsigned()
                .references('id')
                .inTable('users')
                .onDelete('CASCADE')

            table.string('name', 254).notNullable()
            table.string('nick_name', 254).notNullable()
            table.string('avatar_url', 254).notNullable()

            table.timestamp('created_at')
            table.timestamp('updated_at')
        })
    }

    async down() {
        this.schema.dropTable(this.tableName)
    }
}