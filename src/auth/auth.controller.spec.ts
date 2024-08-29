import { ConflictException, UnauthorizedException } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TestBed } from "@automock/jest";

describe("AuthController", () => {
  let controller: AuthController;
  let service: jest.Mocked<AuthService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(AuthController).compile();

    controller = unit;
    service = unitRef.get(AuthService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should login a user", async () => {
    const user = { username: "user", password: "password" };
    const expectedAccessToken = "token";
    service.signIn.mockImplementationOnce(async () => ({
      accessToken: expectedAccessToken,
    }));

    const { accessToken } = await controller.signIn(user);

    expect(accessToken).toEqual(expectedAccessToken);
  });

  it("should throw an error when login fails", async () => {
    const user = { username: "user", password: "password" };
    service.signIn.mockRejectedValueOnce(new UnauthorizedException());

    const promise = controller.signIn(user);

    await expect(promise).rejects.toThrow(UnauthorizedException);
  });

  it("should register a user", async () => {
    const user = { username: "user", password: "password" };
    const newUser = {
      id: "1fb52ba3-e7a1-470e-9f4c-55a7d9476da4",
      username: user.username,
    } as const;
    service.signUp.mockImplementationOnce(async () => newUser);

    const result = await controller.signUp(user);

    expect(result).toEqual(newUser);
  });

  it("should throw an error when registration fails", async () => {
    const user = { username: "user", password: "password" };
    service.signUp.mockRejectedValueOnce(new ConflictException());

    const promise = controller.signUp(user);

    await expect(promise).rejects.toThrow(ConflictException);
  });
});
