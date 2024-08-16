import { Injectable } from "@nestjs/common";
import { Task } from "./task.interface";
import { randomUUID } from "node:crypto";

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: randomUUID(),
      title: "Task 1",
      status: "open",
    },
    {
      id: randomUUID(),
      title: "Task 2",
      status: "open",
    },
    {
      id: randomUUID(),
      title: "Task 3",
      status: "open",
    },
  ];

  readTasks(): Task[] {
    return this.tasks;
  }

  createTask(title: string): Task {
    const newTask: Task = {
      id: randomUUID(),
      title,
      status: "open",
    };

    this.tasks.push(newTask);

    return newTask;
  }

  updateTask(id: string, updatedTask: Omit<Task, "id">): Task | null {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      return null;
    }
    this.tasks[taskIndex] = {
      ...this.tasks[taskIndex],
      ...updatedTask,
    };
    return this.tasks[taskIndex];
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
