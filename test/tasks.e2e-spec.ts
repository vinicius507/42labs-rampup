import { HttpStatus, INestApplication, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as request from "supertest";
import { AuthModule } from "../src/auth/auth.module";
import { TasksModule } from "../src/tasks/tasks.module";

describe("TasksController (e2e)", () => {
  let app: INestApplication;

  const userPayload = { username: "test", password: "password" };

  const expectedTask = {
    id: expect.any(String),
    title: "Test Task",
    status: "open",
  };

  const getAccessToken = async () => {
    return await request(app.getHttpServer())
      .post("/auth/login")
      .send(userPayload)
      .expect(HttpStatus.OK)
      .then((res) => res.body.accessToken);
  };

  const getTaskId = async () => {
    const accessToken = await getAccessToken();
    const response = await request(app.getHttpServer())
      .get("/tasks")
      .set("Authorization", `Bearer ${accessToken}`);

    return response.body[0].id;
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TasksModule,
        AuthModule,
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
    app.useGlobalPipes(
      new ValidationPipe({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      })
    );
    await app.init();

    await request(app.getHttpServer())
      .post("/auth/signup")
      .send({ username: "test", password: "password" })
      .expect(HttpStatus.CREATED);
  });

  describe("POST /tasks", () => {
    it("should create a new task", async () => {
      const accessToken = await getAccessToken();

      const response = await request(app.getHttpServer())
        .post("/tasks")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({ title: "Test Task" });

      expect(response.status).toBe(HttpStatus.CREATED);
      expect(response.body).toEqual(expectedTask);
    });

    it("fails if unauthorized", async () => {
      const response = await request(app.getHttpServer())
        .post("/tasks")
        .send({ title: "Test Task" });

      expect(response.status).toBe(HttpStatus.UNAUTHORIZED);
    });

    it("should fail if title is missing", async () => {
      const accessToken = await getAccessToken();

      const response = await request(app.getHttpServer())
        .post("/tasks")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({});

      expect(response.status).toBe(HttpStatus.UNPROCESSABLE_ENTITY);
    });

    it("should fail if title is too short", async () => {
      const accessToken = await getAccessToken();

      const response = await request(app.getHttpServer())
        .post("/tasks")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({ title: "a" });

      expect(response.status).toBe(HttpStatus.UNPROCESSABLE_ENTITY);
    });

    it("should fail if title is too long", async () => {
      const accessToken = await getAccessToken();

      const response = await request(app.getHttpServer())
        .post("/tasks")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({ title: "a".repeat(101) });

      expect(response.status).toBe(HttpStatus.UNPROCESSABLE_ENTITY);
    });
  });

  describe("GET /tasks", () => {
    it("should return an array of tasks", async () => {
      const accessToken = await getAccessToken();

      const response = await request(app.getHttpServer())
        .get("/tasks")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body).toEqual([expectedTask]);
    });

    it("should fail if unauthorized", async () => {
      const response = await request(app.getHttpServer()).get("/tasks");

      expect(response.status).toBe(HttpStatus.UNAUTHORIZED);
    });
  });

  describe("PUT /tasks/:id", () => {
    it("should update a task", async () => {
      const taskId = await getTaskId();
      const accessToken = await getAccessToken();

      const response = await request(app.getHttpServer())
        .put(`/tasks/${taskId}`)
        .set("Authorization", `Bearer ${accessToken}`)
        .send({ title: "Updated Task", status: "done" });

      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body).toEqual({
        id: expect.any(String),
        title: "Updated Task",
        status: "done",
      });
    });

    it("should fail if field is missing", async () => {
      const taskId = await getTaskId();
      const accessToken = await getAccessToken();

      const response = await request(app.getHttpServer())
        .put(`/tasks/${taskId}`)
        .set("Authorization", `Bearer ${accessToken}`)
        .send({ title: "Updated Task" });

      expect(response.status).toBe(HttpStatus.UNPROCESSABLE_ENTITY);
    });

    it("should fail if title is too short", async () => {
      const taskId = await getTaskId();
      const accessToken = await getAccessToken();

      const response = await request(app.getHttpServer())
        .put(`/tasks/${taskId}`)
        .set("Authorization", `Bearer ${accessToken}`)
        .send({ title: "a", status: "done" });

      expect(response.status).toBe(HttpStatus.UNPROCESSABLE_ENTITY);
    });

    it("should fail if title is too long", async () => {
      const taskId = await getTaskId();
      const accessToken = await getAccessToken();

      const response = await request(app.getHttpServer())
        .put(`/tasks/${taskId}`)
        .set("Authorization", `Bearer ${accessToken}`)
        .send({ title: "a".repeat(101), status: "done" });

      expect(response.status).toBe(HttpStatus.UNPROCESSABLE_ENTITY);
    });

    it("should fail if status is not valid", async () => {
      const taskId = await getTaskId();
      const accessToken = await getAccessToken();

      const response = await request(app.getHttpServer())
        .put(`/tasks/${taskId}`)
        .set("Authorization", `Bearer ${accessToken}`)
        .send({ title: "Updated Task", status: "unknown-status" });

      expect(response.status).toBe(HttpStatus.UNPROCESSABLE_ENTITY);
    });

    it("should fail if unauthorized", async () => {
      const taskId = await getTaskId();

      const response = await request(app.getHttpServer())
        .put(`/tasks/${taskId}`)
        .send({ title: "Updated Task", status: "done" });

      expect(response.status).toBe(HttpStatus.UNAUTHORIZED);
    });
  });

  describe("DELETE /tasks/:id", () => {
    it("should delete a task", async () => {
      const taskId = await getTaskId();
      const accessToken = await getAccessToken();

      const response = await request(app.getHttpServer())
        .delete(`/tasks/${taskId}`)
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.status).toBe(HttpStatus.NO_CONTENT);
    });

    it("should fail if unauthorized", async () => {
      const taskId = "1f1b1b1b-1b1b-1b1b-1b1b-1b1b1b1b1b1b";

      const response = await request(app.getHttpServer()).delete(
        `/tasks/${taskId}`
      );

      expect(response.status).toBe(HttpStatus.UNAUTHORIZED);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
