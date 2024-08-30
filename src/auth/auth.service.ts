import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { HashService } from "../hash/hash.service";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private hashService: HashService,
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(username: string, password: string) {
    const user = await this.usersService.findOne(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    const passwordMatch = await this.hashService.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.username };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(username: string, password: string) {
    const existingUser = await this.usersService.findOne(username);

    if (existingUser) {
      throw new ConflictException(`User ${username} already exists`);
    }

    const hashedPassword = await this.hashService.hash(password);
    return await this.usersService.create(username, hashedPassword);
  }
}
