import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../enums/role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({
    type: 'enum',
    enumName: 'roleEnum',
    enum: Role,
    default: Role.User,
  })
  role: Role;

  @Exclude()
  @CreateDateColumn()
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedAt: Date;
}
