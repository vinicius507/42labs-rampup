export type TaskStatus = "open" | "in_progress" | "done";

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
}
