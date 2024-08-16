import { Injectable } from "@nestjs/common";
import { Task } from "./task.interface";
import { randomUUID } from "node:crypto";

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: "5fc71e98-8f00-430b-864e-d3e2d7f76f5d",
      title: "Task 1",
      status: "open",
    },
    {
      id: "917434e7-d183-4427-a164-03c0318340b6",
      title: "Task 2",
      status: "open",
    },
    {
      id: "a36cb0bd-7c0d-4f0e-9237-e422af3e2a3f",
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
