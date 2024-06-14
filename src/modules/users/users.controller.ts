import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { AuthService } from './services/auth.service';
import { AddRoleDto } from './dtos/addRole.dto';
import { RegisterResendDto } from './dtos/registerResend.dto';

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

  @Post('register/resend')
  registerResend(@Body() body: RegisterResendDto) {
    return this.usersService.registerResend(body.email);
  }

  @Get('confirm/:uuid')
  @Post('confirm/:uuid')
  confirm(@Param("uuid") uuid: string) {
    return this.usersService.confirm(uuid);
  }

  @Post("role/:uuid")
  addRole(@Param("uuid") uuid: string, @Body() body: AddRoleDto) {
    return this.usersService.addRole(uuid, body.roleId);
  }
};
