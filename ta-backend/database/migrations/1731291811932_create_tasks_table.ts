import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tasks'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('task').notNullable()
      table.date('date').notNullable()
      table.text('description')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.timestamp('deleted_at').nullable();
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}