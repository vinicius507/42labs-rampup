import { UUID } from "crypto";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import type { User } from "./user.interface";

@Entity({ name: "users" })
export class UserEntity implements User {
  @PrimaryGeneratedColumn("uuid")
  id: UUID;

  @Column({ length: 12 })
  username: string;

  @Column({ name: "hashed_password" })
  password: string;
}
