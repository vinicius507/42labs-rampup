import { Test, TestingModule } from "@nestjs/testing";
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";
import { Task } from "./task.interface";
import { UUID } from "node:crypto";
import { UpdateTaskDTO } from "./dto";

describe("TasksController", () => {
  let controller: TasksController;

  const expectedCreatedTask = (title: string) => {
    return {
      id: "7c0819c9-ace4-469e-b41a-ee27660deffc",
      title,
      status: "open",
    } as Task;
  };
  const expectedAllTasks: Task[] = [
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

  const mockTasksService = {
    createTask: jest.fn().mockImplementation(expectedCreatedTask),
    readTasks: jest.fn().mockReturnValue(expectedAllTasks),
    updateTask: jest
      .fn()
      .mockImplementation((id: UUID, { title, status }: UpdateTaskDTO) => {
        return { id, title, status };
      }),
    deleteTask: jest.fn().mockImplementation((_: UUID) => undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
    })
      .useMocker((token) => {
        if (token === TasksService) {
          return mockTasksService;
        }
      })
      .compile();

    controller = module.get<TasksController>(TasksController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should create a task", () => {
    const createTaskDTO = { title: "Test Task" };
    const expectedTask = {
      title: createTaskDTO.title,
      status: "open",
    };

    const result = controller.createTask(createTaskDTO);

    expect(result).toEqual({ id: expect.any(String), ...expectedTask });
    expect(mockTasksService.createTask).toHaveBeenLastCalledWith(
      createTaskDTO.title
    );
  });

  it("should return all tasks", () => {
    const result = controller.readTasks();

    expect(result).toEqual(expectedAllTasks);
  });

  it("should update a task", () => {
    const taskId = "71c002ce-5612-446a-a95f-dfb9d3c653de";
    const updateTaskDTO: Omit<Task, "id"> = {
      title: "Updated Task",
      status: "done",
    };
    const expectedTask = {
      id: taskId,
      ...updateTaskDTO,
    };

    const result = controller.updateTask(taskId, updateTaskDTO);

    expect(result).toEqual(expectedTask);
  });

  it("should delete a task", () => {
    const taskId = "5fc71e98-8f00-430b-864e-d3e2d7f76f5d";

    const result = controller.deleteTask(taskId);

    expect(result).toBe(undefined);
    expect(mockTasksService.deleteTask).toHaveBeenCalledWith(taskId);
  });
});
