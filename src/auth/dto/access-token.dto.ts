import { ApiResponseProperty } from "@nestjs/swagger";

export class AccessTokenDTO {
  @ApiResponseProperty({
    example:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNjA5MjM5MDIyfQ",
  })
  accessToken: string;
}
