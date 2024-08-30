import { UUID } from "crypto";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { taskStatuses, type Task, type TaskStatus } from "./task.interface";

@Entity({ name: "tasks" })
export class TaskEntity implements Task {
  @PrimaryGeneratedColumn("uuid")
  id: UUID;

  @Column({ length: 100 })
  title: string;

  @Column({ type: "enum", enum: taskStatuses, default: "open" })
  status: TaskStatus;
}
