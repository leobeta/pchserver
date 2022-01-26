import { CreateUserDto, UpdateUserDto, PaginationUserDto } from './dto';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { User } from './entities';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllUsers(@Query() pagination?: PaginationUserDto): Promise<User[]> {
    return this.usersService.getAllUsers(pagination);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUser(@Param('id') id: number): Promise<User> {
    const user = await this.usersService.getUser(id);
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createUser(@Body() user: CreateUserDto): Promise<User> {
    return this.usersService.createUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateUser(@Body() user: UpdateUserDto): Promise<User> {
    return this.usersService.updateUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeUser(@Param('id') id: number) {
    return this.usersService.removeUser(id);
  }
}
