import { CreateUserDto, PaginationUserDto, UpdateUserDto } from './dto';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async getAllUsers({ limit, offset }: PaginationUserDto): Promise<User[]> {
    return this.userRepository.find({ skip: offset, take: limit });
  }

  async getUser(id: number): Promise<User> {
    const user: User = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return user;
  }

  async createUser(user: CreateUserDto): Promise<User> {
    const newUser: User = this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }

  async updateUser(user: UpdateUserDto): Promise<User> {
    const updatedUser: User = await this.userRepository.preload({ ...user });
    if (!updatedUser) {
      throw new NotFoundException(`User with ID "${user.name}" not found`);
    }
    return this.userRepository.save(updatedUser);
  }

  async removeUser(id: number) {
    return await this.userRepository.delete(id);
  }

  async findOne(username: string): Promise<User> {
    return this.userRepository.findOne({ username });
  }
}
