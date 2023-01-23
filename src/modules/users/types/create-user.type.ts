import { RegisterUserDto } from 'src/modules/auth/dto/register-user.dto';
import { Role } from '../enums/role.enum';

export type CreateUser = RegisterUserDto & {
  role: Role;
};
