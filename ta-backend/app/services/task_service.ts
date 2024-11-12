import { TaskRepository, FilterOption } from "#repositories/task_repository";

export default class TaskService {
  private taskRepository;

  constructor() {
    this.taskRepository = new TaskRepository()
  }

  list({attributes, filter, sort}: FilterOption){
    return this.taskRepository.findAll({
      attributes,
      filter,
      sort
    })
  }

  store(taskData: any){
    return this.taskRepository.create(taskData)
  }

  update(id: any, taskData: any){
    return this.taskRepository.update(id, taskData)
  }

  detail(id: any){
    return this.taskRepository.findById(id)
  }

  destroy(id: any){
    return this.taskRepository.delete(id)
  }
}