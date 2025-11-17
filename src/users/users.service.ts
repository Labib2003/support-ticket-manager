import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { eq } from 'drizzle-orm';
import { user } from 'db/schema';

@Injectable()
export class UsersService {
  constructor(private readonly drizzle: DrizzleService) { }

  async create(createUserDto: CreateUserDto) {
    return await this.drizzle.db.insert(user).values(createUserDto).returning();
  }

  async findAll() {
    return await this.drizzle.db.select().from(user);
  }

  async findOne(id: string) {
    return (
      await this.drizzle.db.select().from(user).where(eq(user.id, id))
    )[0];
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.drizzle.db
      .update(user)
      .set(updateUserDto)
      .where(eq(user.id, id))
      .returning();
  }

  async remove(id: string) {
    return await this.drizzle.db.delete(user).where(eq(user.id, id));
  }
}
