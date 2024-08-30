import { ApiResponseProperty } from "@nestjs/swagger";
import { UUID } from "node:crypto";
import { TaskStatus, taskStatuses } from "../task.interface";

export class TaskDTO {
  @ApiResponseProperty({ type: "string", format: "uuid" })
  id: UUID;

  @ApiResponseProperty({ type: "string", example: "Play the piano" })
  title: string;

  @ApiResponseProperty({
    type: "enum",
    example: "in_progress",
    enum: taskStatuses,
  })
  status: TaskStatus;
}
