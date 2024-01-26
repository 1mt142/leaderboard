import {
  Injectable,
  Post,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import {
  CreatedResponse,
  DetailsFoundResponse,
  ListFoundResponse,
  UpdatedResponse,
} from 'src/constant/success-response';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  @Post()
  async create(createUserDto: CreateUserDto) {
    console.log('createUserDto', createUserDto);
    const hashedPassword = await bcrypt.hash(createUserDto.password, 12);
    createUserDto.password = hashedPassword;

    try {
      const response = await this.userRepository.save(createUserDto);
      if (response.id) {
        return CreatedResponse({
          resCode: 'UC200',
          message: 'User Created Successfuly!',
          lang: 'en',
        });
      }
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Email already exists');
      }
      throw new Error('An error occurred while creating the user');
    }
  }

  async findAll() {
    try {
      const results = await this.userRepository.find({
        select: ['id', 'username', 'email', 'created_at', 'updated_at'],
      });
      return results;
    } catch (error) {
      throw new InternalServerErrorException('Error while fetching users');
    }
  }

  async findOne(id: string) {
    try {
      const result = await this.userRepository.findOne({
        where: {
          id: id,
        },
        select: [
          'id',
          'username',
          'email',
          'created_at',
          'updated_at',
          'user_type',
        ],
      });

      if (result.id) {
        return DetailsFoundResponse({
          message: 'User details found!',
          resCode: 'UDF200',
          lang: 'en',
          results: result,
        });
      }
    } catch (error) {
      throw new InternalServerErrorException(
        'Error while fetching user details',
      );
    }
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<{ message: string }> {
    try {
      const updateResult = await this.userRepository
        .createQueryBuilder()
        .update(User)
        .set({ username: updateUserDto.username })
        .where('id = :id', { id: id })
        .execute();

      if (updateResult?.affected === 0) {
        return { message: `User with ID ${id} not found` };
      }

      return UpdatedResponse({
        message: 'User Updated Successfully!',
        resCode: 'UU200',
        lang: 'en',
      });

      {
      }
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while updating the user',
      );
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findOneByEmail(email: string) {
    try {
      return await this.userRepository.findOne({
        where: {
          email: email,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error while fetching user details',
      );
    }
  }

  async updateUserType(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<{ message: string }> {
    try {
      const updateResult = await this.userRepository
        .createQueryBuilder()
        .update(User)
        .set({ user_type: updateUserDto.user_type })
        .where('id = :id', { id: id })
        .execute();

      if (updateResult?.affected === 0) {
        return { message: `User with ID ${id} not found` };
      }
      return { message: `User Updated to ${updateUserDto.user_type}` };
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while updating the user',
      );
    }
  }
}
