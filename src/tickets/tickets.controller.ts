import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { CreateTicketDto, createTicketSchema } from './dto/create-ticket.dto';
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
  constructor(private ticketsService: TicketsService) { }

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
  findMany() {
    return this.ticketsService.findMany();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a ticket by ID' })
  @ApiOkResponse({
    description: 'Ticket retrieved successfully',
    type: TicketDto,
  })
  async findOne(@Param('id') id: string) {
    const ticket = await this.ticketsService.findOne(id);

    if (!ticket) throw new NotFoundException('Ticket not found');

    return ticket;
  }

  @Post()
  @ApiOperation({ summary: 'Create a new ticket (User only)' })
  @ApiOkResponse({ description: 'Ticket created successfully' })
  create(
    @Body(new ZodValidationPipe(createTicketSchema.omit({ createdById: true })))
    body: CreateTicketDto,
  ) {
    const userId = '';
    return this.ticketsService.create({ ...body, createdById: userId });
  }

  @Patch(':id')
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
  @ApiOperation({ summary: 'Delete a ticket (Admin only)' })
  @ApiOkResponse({ description: 'Ticket deleted successfully' })
  delete(@Param('id') id: string) {
    return this.ticketsService.delete(id);
  }
}
