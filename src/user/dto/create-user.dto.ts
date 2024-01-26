import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserType } from './user-type.dto';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Username is required' })
  @MinLength(3, { message: 'Username must be at least 3 characters long' })
  @MaxLength(250, {
    message: 'Username cannot be more than 250 characters long',
  })
  username: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  @MinLength(5, { message: 'Email must be at least 5 characters long' })
  @MaxLength(100, { message: 'Email cannot be more than 100 characters long' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(50, { message: 'Password cannot be more than 50 characters long' })
  password: string;

  @IsOptional()
  user_type: UserType;
}
