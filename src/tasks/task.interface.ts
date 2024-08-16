import type { UUID } from "node:crypto";

export type TaskStatus = "open" | "in_progress" | "done";

export interface Task {
  id: UUID;
  title: string;
  status: TaskStatus;
}
