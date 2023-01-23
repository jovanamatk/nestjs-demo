import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
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
