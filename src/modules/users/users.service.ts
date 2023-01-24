import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PasswordService } from '../auth/services/password.service';
import { User } from './entities/user.entity';
import { CreateUser } from './types/create-user.type';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @Inject(forwardRef(() => PasswordService))
    private readonly passwordService: PasswordService,
  ) {}

  async findById(id: number, relations = []): Promise<User> {
    return await this.usersRepository
      .find({ where: { id }, relations })
      .then((users) => users[0]);
  }

  async findByEmail(email: string, relations = []): Promise<User> {
    return await this.usersRepository
      .find({ where: { email }, relations })
      .then((users) => users[0]);
  }

  async create({ email, password, role }: CreateUser) {
    const hashedPassword = await this.passwordService.hashPassword(password);
    const user = this.usersRepository.create({
      email,
      password: hashedPassword,
      role,
    });

    return this.usersRepository.save(user);
  }
}
