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
import {
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { TicketDto } from './dto/select-ticket.dto';

@Controller('tickets')
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
export class TicketsController {
  constructor(private ticketsService: TicketsService) {}

  @Get()
  @ApiOperation({
    summary:
      'Retrieve all tickets; admins receive all tickets, while users get their own created tickets',
  })
  @ApiOkResponse({
    description: 'List of tickets retrieved successfully',
    type: TicketDto,
    isArray: true,
  })
  findMany(@Session() session: UserSession) {
    const createdById =
      session.user.role === 'USER' ? session.user.id : undefined;
    return this.ticketsService.findMany(createdById);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a ticket by ID' })
  @ApiOkResponse({
    description: 'Ticket retrieved successfully',
    type: TicketDto,
  })
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
  @ApiOperation({ summary: 'Create a new ticket (User only)' })
  @ApiOkResponse({ description: 'Ticket created successfully' })
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
  @ApiOperation({ summary: 'Update a ticket (Admin only)' })
  @ApiOkResponse({
    description: 'Ticket updated successfully',
  })
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateTicketSchema))
    body: Record<string, unknown>,
  ) {
    return this.ticketsService.update(id, body);
  }

  @Delete(':id')
  @Roles(['ADMIN'])
  @ApiOperation({ summary: 'Delete a ticket (Admin only)' })
  @ApiOkResponse({ description: 'Ticket deleted successfully' })
  delete(@Param('id') id: string) {
    return this.ticketsService.delete(id);
  }
}
