import {
  Body,
  ConflictException,
  Controller,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Role } from '../users/enums/role.enum';
import { UsersService } from '../users/users.service';
import { Public } from './decorators/public.decorator';
import { RegisterUserDto } from './dto/register-user.dto';
import { LocalAuthGuard } from './guards/auth-local.guard';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    const { user } = req;
    const jwt = await this.authService.createJwt(user);
    return { ...jwt, user };
  }

  @Public()
  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    if (await this.usersService.findOneByEmail(registerUserDto.email)) {
      throw new ConflictException('User with this email already exists.');
    }

    const user = await this.usersService.create({
      ...registerUserDto,
      role: Role.Subscriber,
    });

    return user;
  }
}
