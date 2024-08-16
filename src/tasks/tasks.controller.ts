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
import { CreateTaskDTO, UpdateTaskDTO } from "./dto";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  readTasks() {
    return this.tasksService.readTasks();
  }

  @Post()
  createTask(@Body() { title }: CreateTaskDTO) {
    return this.tasksService.createTask(title);
  }

  @Put(":id")
  updateTask(@Param("id") id: string, @Body() updatedTask: UpdateTaskDTO) {
    return this.tasksService.updateTask(id, updatedTask);
  }

  @Delete(":id")
  deleteTask(@Param("id") id: string) {
    return this.tasksService.deleteTask(id);
  }
}
