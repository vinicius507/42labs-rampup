import { UUID } from "crypto";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import type { Task, TaskStatus } from "./task.interface";

@Entity()
export class TaskEntity implements Task {
  @PrimaryGeneratedColumn("uuid")
  id: UUID;

  @Column()
  title: string;

  @Column()
  status: TaskStatus;
}
