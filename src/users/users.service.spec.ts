import { TestBed } from "@automock/jest";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "./user.entity";
import { UsersService } from "./users.service";

describe("UsersService", () => {
  let service: UsersService;
  let repository: jest.Mocked<Repository<UserEntity>>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(UsersService).compile();

    service = unit;
    repository = unitRef.get(getRepositoryToken(UserEntity) as string);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should find a user", async () => {
    const username = "user";
    const expectedUser = {
      id: "7ed40727-6853-4bad-987a-a92b90653012",
      username,
      password: "hashedPassword",
    } as const;
    repository.findOneBy.mockResolvedValueOnce(expectedUser);

    const result = await service.findOne(username);

    expect(result).toEqual(expectedUser);
  });

  it("should create a user", async () => {
    const user = { username: "user", password: "password" };
    const expectedUser = {
      id: "7ed40727-6853-4bad-987a-a92b90653012",
      username: user.username,
    } as const;
    repository.save.mockImplementationOnce(async ({ username, password }) => ({
      id: expectedUser.id,
      username,
      password,
    }));

    const result = await service.create(user.username, user.password);

    expect(result).toEqual(expectedUser);
  });
});
