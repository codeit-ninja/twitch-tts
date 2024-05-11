import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
    protected tableName = 'twitch_access_tokens'

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')
            table
                .integer('user_id')
                .notNullable()
                .unsigned()
                .references('id')
                .inTable('users')
                .onDelete('CASCADE')

            table.string('access_token', 254).notNullable()
            table.string('refresh_token', 254).notNullable()
            table.integer('expires_in').notNullable()
            table.timestamp('expires_at').notNullable()
            table.json('scope').notNullable()

            table.timestamp('created_at')
            table.timestamp('updated_at')
        })
    }

    async down() {
        this.schema.dropTable(this.tableName)
    }
}