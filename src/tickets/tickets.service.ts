import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import * as schema from 'db/schema';
import { eq } from 'drizzle-orm';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { DrizzleService } from 'src/drizzle/drizzle.service';

@Injectable()
export class TicketsService {
  constructor(private readonly drizzle: DrizzleService) {}

  async findMany() {
    return await this.drizzle.db.select().from(schema.posts);
  }

  async findOne(id: string) {
    return (
      await this.drizzle.db
        .select()
        .from(schema.posts)
        .where(eq(schema.posts.id, id))
        .limit(1)
    )[0];
  }

  async create(data: CreateTicketDto) {
    return await this.drizzle.db.insert(schema.posts).values(data).returning();
  }

  async update(id: string, data: UpdateTicketDto) {
    return await this.drizzle.db
      .update(schema.posts)
      .set(data)
      .where(eq(schema.posts.id, id))
      .returning();
  }

  async delete(id: string) {
    return await this.drizzle.db
      .delete(schema.posts)
      .where(eq(schema.posts.id, id));
  }
}
