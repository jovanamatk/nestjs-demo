import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async findOneById(id: number, relations = []): Promise<User> {
    return await this.usersRepository.findOneBy({ id });
  }

  async findOneByEmail(email: string, relations = []): Promise<User> {
    return await this.usersRepository.findOneBy({ email });
  }
}
