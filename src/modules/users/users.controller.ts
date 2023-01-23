import {
  Controller,
  Get,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/auth-jwt.guard';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async getById(@Param('id') id: number): Promise<User> {
    const user = await this.usersService.findOneById(id);

    if (user === null) {
      throw new NotFoundException(`User ${id} does not exist.`);
    }

    return user;
  }
}
