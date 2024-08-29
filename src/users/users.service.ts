import { ConflictException, Injectable } from "@nestjs/common";
import { User } from "./user.interface";
import { randomUUID } from "node:crypto";

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: "1fb52ba3-e7a1-470e-9f4c-55a7d9476da4",
      username: "john",
      password: "changeme",
    },
    {
      id: "1e6574c3-bee4-4006-a11b-1d3911e9656c",
      username: "maria",
      password: "guess",
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async create(
    username: string,
    hashedPassword: string
  ): Promise<Omit<User, "password">> {
    const existingUser = await this.findOne(username);

    if (existingUser) {
      throw new ConflictException(
        `User with username '${username}' already exists`
      );
    }

    const newUser = {
      id: randomUUID(),
      username,
    };
    this.users.push({
      ...newUser,
      password: hashedPassword,
    });
    return newUser;
  }
}
