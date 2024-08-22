import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
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
  async readTasks() {
    return await this.tasksService.readTasks();
  }

  @Post()
  async createTask(@Body() { title }: CreateTaskDTO) {
    return await this.tasksService.createTask(title);
  }

  @Put(":id")
  async updateTask(
    @Param("id", ParseUUIDPipe) id: UUID,
    @Body() updateTaskDTO: UpdateTaskDTO
  ) {
    return await this.tasksService.updateTask(id, updateTaskDTO);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTask(@Param("id", ParseUUIDPipe) id: UUID) {
    await this.tasksService.deleteTask(id);
  }
}
