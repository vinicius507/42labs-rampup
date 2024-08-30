import { HttpStatus, INestApplication, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken, TypeOrmModule } from "@nestjs/typeorm";
import * as request from "supertest";
import { Repository } from "typeorm";
import { AuthModule } from "../src/auth/auth.module";
import { UserEntity } from "../src/users/user.entity";

describe("AuthController (e2e)", () => {
  let app: INestApplication;

  const userPayload = { username: "auth-test", password: "password" };

  const createUser = async () => {
    await request(app.getHttpServer())
      .post("/auth/signup")
      .send(userPayload)
      .expect(HttpStatus.CREATED);
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
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
  });

  beforeEach(async () => {
    const repo: Repository<UserEntity> = app.get(
      getRepositoryToken(UserEntity)
    );

    await repo.delete({ username: userPayload.username });
  });

  describe("POST /auth/signup", () => {
    it("should register a new user", async () => {
      await request(app.getHttpServer())
        .post("/auth/signup")
        .send(userPayload)
        .expect(HttpStatus.CREATED);
    });

    it("should return a 409 if the username is already taken", async () => {
      await createUser();

      await request(app.getHttpServer())
        .post("/auth/signup")
        .send(userPayload)
        .expect(HttpStatus.CONFLICT);
    });
  });

  describe("POST /auth/login", () => {
    beforeEach(createUser);

    it("should return an access token", async () => {
      await request(app.getHttpServer())
        .post("/auth/login")
        .send(userPayload)
        .expect(HttpStatus.OK)
        .expect((res) => {
          expect(res.body.accessToken).toBeDefined();
        });
    });

    it("should return a 401 if the username is not found", async () => {
      await request(app.getHttpServer())
        .post("/auth/login")
        .send({ username: "notfound", password: "password" })
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it("should return a 401 if the password is incorrect", async () => {
      await request(app.getHttpServer())
        .post("/auth/login")
        .send({ username: "test", password: "wrongpassword" })
        .expect(HttpStatus.UNAUTHORIZED);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
