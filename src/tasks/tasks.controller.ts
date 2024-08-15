import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get() //GET /tasks
  readTasks() {
    return this.tasksService.readTasks();
  }

  @Post() //POST /tasks
  createTask(@Body() task: { title: string; body: string }) {
    return this.tasksService.createTask(task);
  }

  @Put(":id") //PUT /tasks/:id
  updateTask(
    @Param("id") id: string,
    @Body() updatedTask: { title: string; body: string }
  ) {
    return this.tasksService.updateTask(+id, updatedTask);
  }

  @Delete(":id") //DELETE /tasks/:id
  deleteTask(@Param("id") id: string) {
    return this.tasksService.deleteTask(+id);
  }
}
