import { IsEnum, IsString, Length } from "class-validator";
import { TaskStatus, taskStatuses } from "../task.interface";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateTaskDTO {
  @ApiProperty({
    description: "A string that represents the title of the task.",
    example: "Play the piano",
    minLength: 3,
    maxLength: 100,
  })
  @IsString()
  @Length(3, 100)
  title: string;

  @ApiProperty({
    type: "enum",
    description: "A string that represents the status of the task.",
    example: "in_progress",
    enum: taskStatuses,
  })
  @IsEnum(taskStatuses, {
    message: `Status must be one of these values: ${taskStatuses.join(", ")}`,
  })
  status: TaskStatus;
}
