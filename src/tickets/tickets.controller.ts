import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('tickets')
export class TicketsController {
  @Get()
  findMany() {
    return 'Paginated list of tickets';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `Get ticket with ID: ${id}`;
  }

  @Post()
  create() {
    return 'Create a new ticket';
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return `Update ticket with ID: ${id}`;
  }

  @Delete()
  delete() {
    return 'Delete a ticket';
  }
}
