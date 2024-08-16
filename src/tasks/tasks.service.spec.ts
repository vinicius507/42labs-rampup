import { Test, TestingModule } from "@nestjs/testing";
import type { Task } from "./task.interface";
import { TasksService } from "./tasks.service";

describe("TasksService", () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create a task", () => {
    const taskTitle = "Task 1";
    const expectedTask = {
      title: taskTitle,
      status: "open",
    };

    const result = service.createTask(taskTitle);

    expect(result).toEqual({ id: expect.any(String), ...expectedTask });
  });

  it("should return all tasks", () => {
    const expectedTasks = [
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

    const result = service.readTasks();

    expect(result).toEqual(expectedTasks);
  });

  it("should update a task", () => {
    const taskId = "5fc71e98-8f00-430b-864e-d3e2d7f76f5d";
    const expectedUpdatedTask: Omit<Task, "id"> = {
      title: "Task Bla",
      status: "done",
    };

    const result = service.updateTask(taskId, expectedUpdatedTask);

    expect(result).toEqual({ id: taskId, ...expectedUpdatedTask });
  });

  it("should delete a task", () => {
    const result = service.deleteTask("2");

    expect(result).toBe(undefined);
  });
});
