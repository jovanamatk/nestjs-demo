import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  readonly password: string;
}
