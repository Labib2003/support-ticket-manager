import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import * as schema from 'db/schema';
import { eq } from 'drizzle-orm';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { DrizzleService } from 'src/drizzle/drizzle.service';

@Injectable()
export class TicketsService {
  constructor(private readonly drizzle: DrizzleService) {}

  async findMany(createdById?: string) {
    return await this.drizzle.db
      .select()
      .from(schema.tickets)
      .where(
        createdById ? eq(schema.tickets.createdById, createdById) : undefined,
      );
  }

  async findOne(id: string) {
    return (
      await this.drizzle.db
        .select()
        .from(schema.tickets)
        .where(eq(schema.tickets.id, id))
        .limit(1)
    )[0];
  }

  async create(data: CreateTicketDto) {
    return await this.drizzle.db
      .insert(schema.tickets)
      .values(data)
      .returning();
  }

  async update(id: string, data: UpdateTicketDto) {
    return await this.drizzle.db
      .update(schema.tickets)
      .set(data)
      .where(eq(schema.tickets.id, id))
      .returning();
  }

  async delete(id: string) {
    return await this.drizzle.db
      .delete(schema.tickets)
      .where(eq(schema.tickets.id, id));
  }
}
