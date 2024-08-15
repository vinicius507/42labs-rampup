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
import { TaskStatus } from "./task.interface";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  readTasks() {
    return this.tasksService.readTasks();
  }

  @Post()
  createTask(@Body("title") title: string) {
    return this.tasksService.createTask(title);
  }

  @Put(":id")
  updateTask(
    @Param("id") id: string,
    @Body() updatedTask: { title: string; status: TaskStatus }
  ) {
    return this.tasksService.updateTask(id, updatedTask);
  }

  @Delete(":id")
  deleteTask(@Param("id") id: string) {
    return this.tasksService.deleteTask(id);
  }
}
