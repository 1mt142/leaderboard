import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class LogInDto {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  @MinLength(5, { message: 'Email must be at least 5 characters long' })
  @MaxLength(100, { message: 'Email cannot be more than 100 characters long' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(50, { message: 'Password cannot be more than 50 characters long' })
  password: string;
}
