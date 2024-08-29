import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, MinLength } from "class-validator";

export class CredentialsDTO {
  @ApiProperty({
    description: "The username of the user.",
    example: "john",
    minLength: 3,
    maxLength: 12,
  })
  @IsString()
  @Length(3, 12)
  username: string;

  @ApiProperty({
    description: "The password of the user.",
    example: "changeme",
    minLength: 8,
  })
  @IsString()
  @MinLength(8)
  password: string;
}
