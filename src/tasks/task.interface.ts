import type { UUID } from "node:crypto";

export const taskStatuses = ["open", "in_progress", "done"] as const;

export type TaskStatus = (typeof taskStatuses)[number];

export interface Task {
  id: UUID;
  title: string;
  status: TaskStatus;
}
