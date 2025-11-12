import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { CreateTicketDto, createTicketSchema } from './dto/create-ticket.dto';

@Controller('tickets')
export class TicketsController {
  constructor(private ticketsService: TicketsService) {}

  @Get()
  findMany() {
    return this.ticketsService.findMany();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketsService.findOne(id);
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createTicketSchema))
  create(@Body() body: CreateTicketDto) {
    return this.ticketsService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: Record<string, unknown>) {
    return this.ticketsService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.ticketsService.delete(id);
  }
}
