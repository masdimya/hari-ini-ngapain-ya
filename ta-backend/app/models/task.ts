import { DateTime } from 'luxon'
import { BaseModel, column, beforeFind } from '@adonisjs/lucid/orm'
import type { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'

export class Task extends BaseModel {

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare task: string

  @column()
  declare date: Date

  @column()
  declare description: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.dateTime({ serializeAs: null})
  declare deletedAt: DateTime

  @beforeFind()
  static ignoreDeleted(query: ModelQueryBuilderContract<typeof Task>) {
    query.whereNull('deleted_at')
  }

  public static columns = ['id', 'task', 'date', 'description', 'createdAt', 'updatedAt'] as const
}

export type TaskColumn = typeof Task.columns[number]