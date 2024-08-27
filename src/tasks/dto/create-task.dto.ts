import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class CreateTaskDTO {
  @ApiProperty({
    description: "A string that represents the title of the task.",
    example: "Play the piano",
    minLength: 3,
    maxLength: 100,
  })
  @IsString()
  @Length(3, 100)
  title: string;
}
