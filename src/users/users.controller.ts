import { Body, Controller, Param, Post } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { AuthService } from './services/auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService
  ) {}

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authService.login(body.email, body.password);
  }

  @Post('register')
  register(@Body() body: RegisterDto) {
    return this.usersService.register(body.email, body.password);
  }

  @Post('confirm/:uuid')
  confirm(@Param("uuid") uuid: string) {
    return this.usersService.confirm(uuid);
  }
};
