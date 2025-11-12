import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
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
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ticketsService.findOne(Number(id));
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createTicketSchema))
  create(@Body() body: Record<string, unknown>) {
    return this.ticketsService.create(body);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Record<string, unknown>,
  ) {
    return this.ticketsService.update(Number(id), body);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.ticketsService.delete(Number(id));
  }
}
