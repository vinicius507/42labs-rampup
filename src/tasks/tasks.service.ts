import { Injectable } from "@nestjs/common";
import { Task } from "./task.interface";

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: "1",
      title: "Task 1",
      status: "open",
    },
    {
      id: "2",
      title: "Task 2",
      status: "open",
    },
    {
      id: "3",
      title: "Task 3",
      status: "open",
    },
  ];

  readTasks(): Task[] {
    return this.tasks;
  }

  createTask(title: string): Task {
    const newTask: Task = {
      id: (this.tasks.length + 1).toString(),
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
