import type { HttpContext } from '@adonisjs/core/http'
import TaskService from '#services/task_service'

export default class TaskController {
  private taskService;

  constructor(){
    this.taskService = new TaskService()
  }
  /**
   * Display a list of resource
   */
  async index({request, response}: HttpContext) {
    const filter = request.qs().filter
    const attributes = request.qs().select
    const sort = request.qs().sort
    const store = await this.taskService.list({filter, attributes, sort})
    response.send({data: store, message: "success get list task"})
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const taskData = request.body()
    const store = await this.taskService.store(taskData)
    response.send({data: store, message: "success store task"})
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const taskId = params.id
    const detail = await this.taskService.detail(taskId)
    response.send({ data: detail, message: "success get task" })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const taskData = request.body()
    const taskId = params.id
    const update = await this.taskService.update(taskId, taskData)
    response.send({data: update, message: "success update task"})
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const taskId = params.id
    const destroy = await this.taskService.destroy(taskId)
    response.send({data: destroy, message: "success delete task"})
  }
}