import { LucidModel } from "@adonisjs/lucid/types/model";
import {Task, TaskColumn} from "#models/task";

interface SortOption {
  column: string;
  order: 'asc' | 'desc';
}

export interface FilterOption {
  attributes?: TaskColumn[] | null;
  filter?: { [key in TaskColumn]?: string } | null;
  sort?: string | string[] | null;
}

export class TaskRepository {
  protected model: LucidModel

  constructor() {
    this.model = Task
  }

  create(data: any){
    return this.model.create(data)
  }

  update(id: any, data: any){
    return this.model.query().where('id', id).update(data)
  }

  createBulk(data: any[]){
    this.model.createMany(data)
  }

  findById(id: any){
    return this.model.find(id)
  }

  findAll({attributes, filter, sort}: FilterOption){
    let query = this.model.query()

    if(attributes){
      query.select(attributes)
    }

    if(filter && Object.keys(filter).length){
      Object.keys(filter).forEach((key) => {
        query.where({[key]: filter[key as TaskColumn]})
      })
    }

    if(sort && sort.length){
      const parsed = this.parseSort(sort)
      parsed.forEach((item: SortOption) => {
        query.orderBy(item.column, item.order)
      })
    }


    return query
  }

  delete(id: any){
    return this.model.query().where('id',id).update({deleted_at: new Date()})
  }

  private parseSort(columns: string[] | string ): SortOption[] {
    const arrColumns = Array.isArray(columns) ? columns : [columns]
    const parseColumns: SortOption[] = arrColumns.map(item => {
      return {
        column: item.replace('-',''),
        order: item[0] == '-' ? 'desc' : 'asc'
      }
    })

    return parseColumns
    
  }


}