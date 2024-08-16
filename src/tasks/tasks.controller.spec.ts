import { Test, TestingModule } from "@nestjs/testing";
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";
import { Task } from "./task.interface";

describe("TasksController", () => {
  let controller: TasksController;

  const mockTasksService = {
    createTask: jest.fn().mockImplementation((title: string) => {
      return {
        id: "7c0819c9-ace4-469e-b41a-ee27660deffc",
        title,
        status: "open",
      } as Task;
    }),
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
  });
});
