import {
  Controller,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { GetCurrentUserId } from '../auth/decorators/get-current-user-id.decorator';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async getById(
    @Param('id') id: number,
    @GetCurrentUserId() userId: number,
  ): Promise<User> {
    if (id !== userId) {
      throw new ForbiddenException('You can only access your own account');
    }

    const user = await this.usersService.findOneById(id);

    if (user === null) {
      throw new NotFoundException(`User ${id} does not exist.`);
    }

    return user;
  }
}
