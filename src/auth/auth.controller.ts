import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { AccessTokenDTO, CredentialsDTO } from "./dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: "User successfully logged in.",
    type: AccessTokenDTO,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Invalid credentials.",
  })
  @Post("login")
  @HttpCode(HttpStatus.OK)
  signIn(@Body() signInDto: CredentialsDTO) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Post("signup")
  signUp(@Body() signUpDTO: CredentialsDTO) {
    return this.authService.signUp(signUpDTO.username, signUpDTO.password);
  }
}
