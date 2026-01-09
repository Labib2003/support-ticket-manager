import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DrizzleService } from 'src/drizzle/drizzle.service';

@Injectable()
export class UsersService {
  constructor(private readonly drizzle: DrizzleService) {}

  async create(createUserDto: CreateUserDto) {}

  async findAll() {}

  async findOne(id: string) {}

  async update(id: string, updateUserDto: UpdateUserDto) {}

  async remove(id: string) {}
}
