import { IsString, Length } from "class-validator";

export class CreateTaskDTO {
  @IsString()
  @Length(3, 100)
  title: string;
}
