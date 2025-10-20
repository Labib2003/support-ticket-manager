import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';

@Controller('tickets')
export class TicketsController {
  constructor(private ticketsService: TicketsService) {}

  @Get()
  findMany() {
    return this.ticketsService.findMany();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (isNaN(Number(id))) throw new Error('Invalid ID');
    return this.ticketsService.findOne(Number(id));
  }

  @Post()
  create(@Body() body: Record<string, unknown>) {
    return this.ticketsService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() body: Record<string, unknown>) {
    if (isNaN(Number(id))) throw new Error('Invalid ID');
    return this.ticketsService.update(Number(id), body);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    if (isNaN(Number(id))) throw new Error('Invalid ID');
    return this.ticketsService.delete(Number(id));
  }
}
