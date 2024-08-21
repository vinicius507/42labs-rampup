import { IsEnum, IsString, Length } from "class-validator";
import { TaskStatus, taskStatuses } from "../task.interface";

export class UpdateTaskDTO {
  @IsString()
  @Length(3, 100)
  title: string;

  @IsEnum(taskStatuses, {
    message: `Status must be one of these values: ${taskStatuses.join(", ")}`,
  })
  status: TaskStatus;
}
