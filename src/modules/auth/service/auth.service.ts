import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/modules/users/entities/user.entity';
import { UsersService } from '../../users/users.service';
import { PasswordService } from './password.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly passwordService: PasswordService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOneByEmail(email);

    // const isPasswordValid = await this.passwordService.validatePassword(
    //   password,
    //   user.password,
    // );

    const isPasswordValid = password === user.password; // will be removed when /register route is implemented

    if (isPasswordValid === true) {
      return user;
    }

    return null;
  }

  async createJwt(user: User) {
    return {
      access_token: this.jwtService.sign({
        id: user.id,
        email: user.email,
        role: user.role,
      }),
    };
  }
}
