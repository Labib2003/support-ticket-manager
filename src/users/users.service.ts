import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { users } from 'db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
  constructor(private readonly drizzle: DrizzleService) {}

  async create(createUserDto: CreateUserDto) {
    return await this.drizzle.db
      .insert(users)
      .values(createUserDto)
      .returning();
  }

  async findAll() {
    return await this.drizzle.db.select().from(users);
  }

  async findOne(id: string) {
    return (
      await this.drizzle.db.select().from(users).where(eq(users.id, id))
    )[0];
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.drizzle.db
      .update(users)
      .set(updateUserDto)
      .where(eq(users.id, id))
      .returning();
  }

  async remove(id: string) {
    return await this.drizzle.db.delete(users).where(eq(users.id, id));
  }
}
