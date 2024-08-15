import { Injectable } from "@nestjs/common";

@Injectable()
export class TasksService {
  private tasks = [
    {
      id: 1,
      title: "Task 1",
      body: "Aprender NestJS",
    },
    {
      id: 2,
      title: "Task 2",
      body: "Blablabla",
    },
    {
      id: 3,
      title: "Task 3",
      body: "Lalalalala",
    },
  ];

  readTasks() {
    return this.tasks;
  }

  createTask(task: { title: string; body: string }) {
    const newTask = {
      id: this.tasks.length + 1,
      ...task,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  updateTask(id: number, updatedTask: { title?: string; body?: string }) {
    this.tasks = this.tasks.map((task) => {
      if (task.id === id) {
        return { ...task, ...updatedTask };
      }
      return task;
    });

    return this.readTasks();
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter((task) => task.id !== id);

    return this.readTasks();
  }
}
