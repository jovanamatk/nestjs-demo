import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { Public } from './decorator/public.decorator';
import { LocalAuthGuard } from './guard/auth-local.guard';
import { AuthService } from './service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    const { user } = req;
    const jwt = await this.authService.createJwt(user);
    return { ...jwt, user };
  }
}
