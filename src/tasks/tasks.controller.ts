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
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import type { UUID } from "node:crypto";
import { AuthGuard } from "../auth/auth.guard";
import { CreateTaskDTO, TaskDTO, UpdateTaskDTO } from "./dto";
import { TasksService } from "./tasks.service";

@ApiBearerAuth()
@ApiTags("tasks")
@UseGuards(AuthGuard)
@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: "Returns all tasks.",
    type: [TaskDTO],
  })
  @Get()
  async readTasks() {
    return await this.tasksService.readTasks();
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Task created successfully.",
    type: TaskDTO,
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description:
      "Title has less than 3 characters or more than 100 characters.",
  })
  @Post()
  async createTask(@Body() { title }: CreateTaskDTO) {
    return await this.tasksService.createTask(title);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: "Task updated successfully.",
    type: TaskDTO,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Task with the specified id was not found in the database.",
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: "Request body contains invalid data.",
  })
  @Put(":id")
  async updateTask(
    @Param("id", ParseUUIDPipe) id: UUID,
    @Body() updateTaskDTO: UpdateTaskDTO
  ) {
    return await this.tasksService.updateTask(id, updateTaskDTO);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Task deleted successfully.",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Task with the specified id was not found in the database.",
  })
  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTask(@Param("id", ParseUUIDPipe) id: UUID) {
    await this.tasksService.deleteTask(id);
  }
}
