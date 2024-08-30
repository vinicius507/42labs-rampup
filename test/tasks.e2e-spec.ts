import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as request from "supertest";
import { TasksModule } from "../src/tasks/tasks.module";

describe("TasksController (e2e)", () => {
  let app: INestApplication;

  const expectedTask = {
    id: expect.any(String),
    title: "Test Task",
    status: "open",
  };

  const getTaskId = async () => {
    const response = await request(app.getHttpServer()).get("/tasks");

    return response.body[0].id as number;
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TasksModule,
        TypeOrmModule.forRoot({
          type: "postgres",
          host: "db",
          username: "rampup",
          password: "password",
          database: "rampup",
          autoLoadEntities: true,
          synchronize: true,
          dropSchema: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("POST /tasks", async () => {
    const response = await request(app.getHttpServer())
      .post("/tasks")
      .send({ title: "Test Task" });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(expectedTask);
  });

  it("GET /tasks", async () => {
    const response = await request(app.getHttpServer()).get("/tasks");

    expect(response.status).toBe(200);
    expect(response.body).toContainEqual(expectedTask);
  });

  it("PUT /tasks/:id", async () => {
    const taskId = await getTaskId();

    const response = await request(app.getHttpServer())
      .put(`/tasks/${taskId}`)
      .send({ title: "Test Task", status: "done" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ ...expectedTask, status: "done" });
  });

  it("DELETE /tasks/:id", async () => {
    const taskId = await getTaskId();

    const response = await request(app.getHttpServer()).delete(
      `/tasks/${taskId}`
    );

    expect(response.status).toBe(204);
  });

  afterAll(async () => {
    await app.close();
  });
});
