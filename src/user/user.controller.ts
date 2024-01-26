import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/auth/auth.guard';
import { Public } from 'src/auth/decorators/public.decorator';
import { ApiResponseInterceptor } from 'src/common/response/response.interceptor';
import { LogInDto } from './dto/login.dto';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post('/register')
  @Public()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @UseInterceptors(
    new ApiResponseInterceptor({
      message: 'Users Successfully Found!',
      resCode: 'UL200',
    }),
  )
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Public()
  @Post('/login')
  async login(
    @Body() // @Body('email') email: string,
    logInDto // @Body('password') password: string,
    : LogInDto,
  ) {
    const user = await this.userService.findOneByEmail(logInDto.email);

    console.log('User', user);

    if (!user) {
      throw new BadRequestException('Oops! Invalid credentials');
    }

    if (!(await bcrypt.compare(logInDto.password, user.password))) {
      throw new BadRequestException('Oops! Invalid credentials');
    }

    const token = await this.jwtService.signAsync({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.user_type,
    });

    return {
      message: `Hello!, ${user.username} you have successfully logged in.`,
      accessToken: token,
    };
  }
}
