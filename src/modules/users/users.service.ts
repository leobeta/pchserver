import { CreateUserDto, UpdateUserDto } from './dto';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) { }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUser(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return user;
  }

  async createUser(user: CreateUserDto): Promise<User> {
    console.log(user);
    const newUser = this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }

  async updateUser(user: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userRepository.preload({ ...user });
    if (!updatedUser) {
      throw new NotFoundException(`User with ID "${user.name}" not found`);
    }
    return this.userRepository.save(updatedUser);
  }

  async removeUser(id: number) {
    return await this.userRepository.delete(id);
  }

  async findOne(username: string): Promise<User | undefined> {
    return await this.userRepository.find(user => user.username === username);
  }
}
