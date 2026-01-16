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
  UseGuards,
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
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/auth/user.decorator';
import { ISafeUser } from 'db/schema';

@Controller('tickets')
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
export class TicketsController {
  constructor(private ticketsService: TicketsService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary:
      'Retrieve all tickets; admins receive all tickets, while users get their own created tickets',
  })
  @ApiOkResponse({
    description: 'List of tickets retrieved successfully',
    type: TicketDto,
    isArray: true,
  })
  findMany(@User() user: ISafeUser) {
    let createdById: string | undefined;
    if (user.role === 'USER') createdById = user.id;

    return this.ticketsService.findMany(createdById);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get a ticket by ID' })
  @ApiOkResponse({
    description: 'Ticket retrieved successfully',
    type: TicketDto,
  })
  async findOne(@Param('id') id: string, @User() user: ISafeUser) {
    const ticket = await this.ticketsService.findOne(id);

    if (!ticket) throw new NotFoundException('Ticket not found');
    if (user.role !== 'ADMIN' && ticket.createdById !== user.id)
      throw new UnauthorizedException();

    return ticket;
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create a new ticket (User only)' })
  @ApiOkResponse({ description: 'Ticket created successfully' })
  create(
    @Body(new ZodValidationPipe(createTicketSchema.omit({ createdById: true })))
    body: CreateTicketDto,
    @User() user: ISafeUser,
  ) {
    const userId = user.id;
    return this.ticketsService.create({ ...body, createdById: userId });
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update a ticket (Admin only)' })
  @ApiOkResponse({
    description: 'Ticket updated successfully',
  })
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateTicketSchema))
    body: Record<string, unknown>,
    @User() user: ISafeUser,
  ) {
    if (user.role !== 'ADMIN') throw new UnauthorizedException();
    return this.ticketsService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Delete a ticket (Admin only)' })
  @ApiOkResponse({ description: 'Ticket deleted successfully' })
  delete(@Param('id') id: string, @User() user: ISafeUser) {
    if (user.role !== 'ADMIN') throw new UnauthorizedException();
    return this.ticketsService.delete(id);
  }
}
