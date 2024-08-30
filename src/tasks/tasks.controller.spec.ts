import { TestBed } from "@automock/jest";
import { NotFoundException } from "@nestjs/common";
import { Task } from "./task.interface";
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";

describe("TasksController", () => {
  let controller: TasksController;
  let service: jest.Mocked<TasksService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(TasksController).compile();

    controller = unit;
    service = unitRef.get(TasksService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should create a task", async () => {
    const createTaskDTO = { title: "Test Task" };
    const expectedTask = {
      id: "7c0819c9-ace4-469e-b41a-ee27660deffc",
      title: createTaskDTO.title,
      status: "open",
    };
    service.createTask.mockImplementationOnce(async (title) => ({
      id: "7c0819c9-ace4-469e-b41a-ee27660deffc",
      title,
      status: "open",
    }));

    const result = await controller.createTask(createTaskDTO);

    expect(result).toEqual({ id: expect.any(String), ...expectedTask });
    expect(service.createTask).toHaveBeenLastCalledWith(createTaskDTO.title);
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
    service.readTasks.mockResolvedValueOnce(expectedTasks);

    const result = await controller.readTasks();

    expect(result).toEqual(expectedTasks);
    expect(service.readTasks).toHaveBeenCalled();
  });

  it("should return 404 when updating a non-existing task", async () => {
    const taskId = "71c002ce-5612-446a-a95f-dfb9d3c653de";
    const updateTaskDTO: Omit<Task, "id"> = {
      title: "Updated Task",
      status: "done",
    };
    service.updateTask.mockImplementationOnce(async () => {
      throw new NotFoundException();
    });

    const result = controller.updateTask(taskId, updateTaskDTO);

    expect(result).rejects.toThrow(NotFoundException);
    expect(service.updateTask).toHaveBeenCalledWith(taskId, updateTaskDTO);
  });

  it("should update a task", async () => {
    const taskId = "71c002ce-5612-446a-a95f-dfb9d3c653de";
    const updateTaskDTO: Omit<Task, "id"> = {
      title: "Updated Task",
      status: "done",
    };
    const expectedTask = {
      id: taskId,
      ...updateTaskDTO,
    };
    service.updateTask.mockImplementationOnce(async (id, task) => ({
      id,
      ...task,
    }));

    const result = await controller.updateTask(taskId, updateTaskDTO);

    expect(result).toEqual(expectedTask);
    expect(service.updateTask).toHaveBeenCalledWith(taskId, updateTaskDTO);
  });

  it("should delete a task", async () => {
    const taskId = "5fc71e98-8f00-430b-864e-d3e2d7f76f5d";
    service.deleteTask.mockImplementationOnce(async () => undefined);

    const result = await controller.deleteTask(taskId);

    expect(result).toBe(undefined);
    expect(service.deleteTask).toHaveBeenCalledWith(taskId);
  });
});
