import { Injectable, NotFoundException } from "@nestjs/common";
import { Task } from "./task.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { TaskEntity } from "./tasks.entity";
import { Repository } from "typeorm";
import type { UUID } from "node:crypto";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private tasksRepository: Repository<TaskEntity>
  ) {}

  async readTasks(): Promise<Task[]> {
    return await this.tasksRepository.find();
  }

  async createTask(title: string): Promise<Task> {
    return await this.tasksRepository.save({
      title,
      status: "open",
    });
  }

  async updateTask(
    id: UUID,
    updatedTask: Omit<Task, "id">
  ): Promise<Task | null> {
    const task = await this.tasksRepository.findOneBy({ id });

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    const result = await this.tasksRepository
      .createQueryBuilder()
      .update()
      .set(updatedTask)
      .where("id = :id", { id })
      .returning("*")
      .execute();

    return result.raw[0] as Task;
  }

  async deleteTask(id: UUID): Promise<void> {
    const taskExists = await this.tasksRepository.existsBy({ id });

    if (!taskExists) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    await this.tasksRepository.delete(id);
  }
}
