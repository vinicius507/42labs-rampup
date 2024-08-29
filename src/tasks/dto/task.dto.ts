import { ApiResponseProperty } from "@nestjs/swagger";
import { taskStatuses, TaskStatus } from "../task.interface";
import { UUID } from "node:crypto";

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
