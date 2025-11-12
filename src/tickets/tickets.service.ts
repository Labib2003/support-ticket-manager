import { Inject, Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from 'src/db/schema';
import { eq } from 'drizzle-orm';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Injectable()
export class TicketsService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async findMany() {
    return await this.db.select().from(schema.posts);
  }

  async findOne(id: string) {
    return (
      await this.db
        .select()
        .from(schema.posts)
        .where(eq(schema.posts.id, id))
        .limit(1)
    )[0];
  }

  async create(data: CreateTicketDto) {
    return await this.db.insert(schema.posts).values(data).returning();
  }

  async update(id: string, data: UpdateTicketDto) {
    return await this.db
      .update(schema.posts)
      .set(data)
      .where(eq(schema.posts.id, id))
      .returning();
  }

  async delete(id: string) {
    return await this.db.delete(schema.posts).where(eq(schema.posts.id, id));
  }
}
