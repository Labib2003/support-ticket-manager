import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { updateTicketSchema } from 'src/tickets/dto/update-ticket.dto';
import {
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserDto } from './dto/select-user.dto';

@Controller('users')
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users (Admin only)' })
  @ApiOkResponse({
    description: 'List of users retrieved successfully',
    type: UserDto,
    isArray: true,
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID (Admin only)' })
  @ApiOkResponse({ description: 'User retrieved successfully', type: UserDto })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user (Admin only)' })
  @ApiOkResponse({ description: 'User updated successfully' })
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateTicketSchema))
    updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user (Admin only)' })
  @ApiOkResponse({ description: 'User deleted successfully' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
