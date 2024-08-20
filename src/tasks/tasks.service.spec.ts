import { TestBed } from "@automock/jest";
import { Repository } from "typeorm";
import { TasksService } from "./tasks.service";
import { Task } from "./task.interface";
import { TaskEntity } from "./tasks.entity";
import { getRepositoryToken } from "@nestjs/typeorm";

describe("TasksService", () => {
  let service: TasksService;
  let repository: jest.Mocked<Repository<TaskEntity>>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(TasksService).compile();

    service = unit;
    repository = unitRef.get(getRepositoryToken(TaskEntity) as string);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create a task", async () => {
    const taskTitle = "Task 1";
    const expectedTask: Task = {
      id: "5fc71e98-8f00-430b-864e-d3e2d7f76f5d",
      title: taskTitle,
      status: "open",
    };
    repository.save.mockImplementationOnce(async ({ title, status }) => ({
      id: expectedTask.id,
      title,
      status,
    }));

    const result = await service.createTask(taskTitle);

    expect(result).toEqual(expectedTask);
    expect(repository.save).toHaveBeenCalledWith({
      title: taskTitle,
      status: "open",
    });
  });

  it("should return all tasks", async () => {
    const expectedTasks: Task[] = [
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
    repository.find.mockImplementationOnce(async () => expectedTasks);

    const result = await service.readTasks();

    expect(result).toEqual(expectedTasks);
    expect(repository.find).toHaveBeenCalled();
  });

  it("should update a task", async () => {
    const taskId = "5fc71e98-8f00-430b-864e-d3e2d7f76f5d";
    const expectedUpdatedTask: Task = {
      id: taskId,
      title: "Task Bla",
      status: "done",
    };
    repository.findOneBy.mockResolvedValueOnce(expectedUpdatedTask);
    repository.createQueryBuilder.mockReturnValueOnce({
      update: jest.fn().mockReturnThis(),
      set: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      returning: jest.fn().mockReturnThis(),
      execute: jest.fn().mockResolvedValueOnce({
        raw: [expectedUpdatedTask],
      }),
    } as any);

    const result = await service.updateTask(taskId, expectedUpdatedTask);

    expect(result).toEqual(expectedUpdatedTask);
    expect(repository.findOneBy).toHaveBeenCalledWith({ id: taskId });
    expect(repository.createQueryBuilder).toHaveBeenCalledWith();
  });

  it("should delete a task", async () => {
    const taskId = "5fc71e98-8f00-430b-864e-d3e2d7f76f5d";

    repository.delete.mockResolvedValueOnce(undefined);

    const result = await service.deleteTask(taskId);

    expect(result).toBe(undefined);
    expect(repository.delete).toHaveBeenCalledWith(taskId);
  });
});
