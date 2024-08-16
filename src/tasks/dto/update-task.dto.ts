import { TaskStatus } from "../task.interface";

export class UpdateTaskDTO {
  title: string;
  status: TaskStatus;
}
