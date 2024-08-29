import { TestBed } from "@automock/jest";
import { JwtService } from "@nestjs/jwt";
import { HashService } from "../hash/hash.service";
import { UsersService } from "../users/users.service";
import { AuthService } from "./auth.service";
import { ConflictException, UnauthorizedException } from "@nestjs/common";

describe("AuthService", () => {
  let service: AuthService;
  let hashService: jest.Mocked<HashService>;
  let jwtService: jest.Mocked<JwtService>;
  let usersService: jest.Mocked<UsersService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(AuthService).compile();

    service = unit;
    hashService = unitRef.get(HashService);
    jwtService = unitRef.get(JwtService);
    usersService = unitRef.get(UsersService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should login a user", async () => {
    const user = { username: "user", password: "password" };
    const expectedAccessToken = "token";
    hashService.compare.mockImplementationOnce(async () => true);
    jwtService.signAsync.mockImplementationOnce(
      async () => expectedAccessToken
    );
    usersService.findOne.mockImplementationOnce(async (username) => ({
      id: "1fb52ba3-e7a1-470e-9f4c-55a7d9476da4",
      username,
      password: "hashedPassword",
    }));

    const { accessToken } = await service.signIn(user.username, user.password);

    expect(accessToken).toEqual(expectedAccessToken);
  });

  it("should throw an error when login fails", async () => {
    const user = { username: "user", password: "password" };
    hashService.compare.mockImplementationOnce(async () => false);
    usersService.findOne.mockImplementationOnce(async (username) => ({
      id: "1fb52ba3-e7a1-470e-9f4c-55a7d9476da4",
      username,
      password: "hashedPassword",
    }));

    const promise = service.signIn(user.username, user.password);

    await expect(promise).rejects.toThrow(UnauthorizedException);
  });

  it("should register a user", async () => {
    const user = { username: "user", password: "password" };
    const newUser = {
      id: "1fb52ba3-e7a1-470e-9f4c-55a7d9476da4",
      username: user.username,
    } as const;
    hashService.hash.mockImplementationOnce(async () => "hashedPassword");
    usersService.findOne.mockImplementationOnce(async () => undefined);
    usersService.create.mockImplementationOnce(async () => newUser);

    const result = await service.signUp(user.username, user.password);

    expect(result).toEqual(newUser);
  });

  it("should throw an error when registering an existing user", async () => {
    const user = { username: "user", password: "password" };
    hashService.hash.mockImplementationOnce(async () => "hashedPassword");
    usersService.findOne.mockImplementationOnce(async (username) => ({
      id: "1fb52ba3-e7a1-470e-9f4c-55a7d9476da4",
      username,
      password: "hashedPassword",
    }));

    const promise = service.signUp(user.username, user.password);

    await expect(promise).rejects.toThrow(ConflictException);
  });
});
