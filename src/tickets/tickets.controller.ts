import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { CreateTicketDto, createTicketSchema } from './dto/create-ticket.dto';
import { Roles, Session, UserSession } from '@thallesp/nestjs-better-auth';
import { updateTicketSchema } from './dto/update-ticket.dto';

@Controller('tickets')
export class TicketsController {
  constructor(private ticketsService: TicketsService) {}

  @Get()
  findMany(@Session() session: UserSession) {
    const createdById =
      session.user.role === 'USER' ? session.user.id : undefined;
    return this.ticketsService.findMany(createdById);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Session() session: UserSession) {
    const ticket = await this.ticketsService.findOne(id);

    if (!ticket) throw new NotFoundException('Ticket not found');
    if (session.user.role === 'USER' && ticket.createdById !== session.user.id)
      throw new UnauthorizedException(
        'You are not authorized to access this ticket',
      );

    return ticket;
  }

  @Post()
  @Roles(['USER'])
  create(
    @Session() session: UserSession,
    @Body(new ZodValidationPipe(createTicketSchema.omit({ createdById: true })))
    body: CreateTicketDto,
  ) {
    const userId = session.user.id;
    return this.ticketsService.create({ ...body, createdById: userId });
  }

  @Patch(':id')
  @Roles(['ADMIN'])
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateTicketSchema))
    body: Record<string, unknown>,
  ) {
    return this.ticketsService.update(id, body);
  }

  @Delete(':id')
  @Roles(['ADMIN'])
  delete(@Param('id') id: string) {
    return this.ticketsService.delete(id);
  }
}
