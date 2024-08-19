import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from "@nestjs/common";
import type { UUID } from "node:crypto";
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
  updateTask(
    @Param("id", ParseUUIDPipe) id: UUID,
    @Body() updatedTask: UpdateTaskDTO
  ) {
    return this.tasksService.updateTask(id, updatedTask);
  }

  @Delete(":id")
  deleteTask(@Param("id", ParseUUIDPipe) id: UUID) {
    return this.tasksService.deleteTask(id);
  }
}
