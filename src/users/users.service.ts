import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { users } from 'db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
  constructor(private readonly drizzle: DrizzleService) {}

  async findAll() {
    return this.drizzle.db.select().from(users);
  }

  async findOne(id: string) {
    return this.drizzle.db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);
  }

  async findByEmail(email: string) {
    return this.drizzle.db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.drizzle.db
      .update(users)
      .set(updateUserDto)
      .where(eq(users.id, id))
      .returning();
  }

  async remove(id: string) {
    return this.drizzle.db.delete(users).where(eq(users.id, id)).returning();
  }
}
