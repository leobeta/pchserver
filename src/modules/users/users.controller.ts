import { PaginationUserDto } from './dto/pagination-user.dto';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './entities';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllUsers(@Query() pagination: PaginationUserDto): Promise<User[]> {
    return this.usersService.getAllUsers(pagination);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getUser(@Param('id') id: number): Promise<User> {
    return this.usersService.getUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createUser(@Body() user: CreateUserDto): Promise<User> {
    return this.usersService.createUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  updateUser(@Body() user: UpdateUserDto): Promise<User> {
    return this.usersService.updateUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  removeUser(@Param('id') id: number) {
    return this.usersService.removeUser(id);
  }
}
