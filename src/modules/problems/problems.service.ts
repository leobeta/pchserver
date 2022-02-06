import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProblemsDto, PaginationProblemsDto, UpdateProblemsDto } from './dto';
import { Problems } from './entities';

@Injectable()
export class ProblemsService {
  constructor(
    @InjectRepository(Problems)
    private readonly problemsService: Repository<Problems>,
  ) {}

  async findAllProblems({ limit, offset }: PaginationProblemsDto): Promise<Problems[]> {
    return this.problemsService.find({
      relations: ['case_history'],
      skip: offset,
      take: limit,
    });
  }

  async findProblemsById(id: number): Promise<Problems> {
    const problem = await this.problemsService.findOne(id, {
      relations: ['case_history'],
    });
    if (!problem) {
      throw new NotFoundException(`Problems with ID "${id}" not found`);
    }
    return problem;
  }

  async createProblems(problems: CreateProblemsDto): Promise<Problems> {
    const newProblems: Problems = this.problemsService.create(problems);
    return await this.problemsService.save(newProblems);
  }

  async updateProblems(problems: UpdateProblemsDto): Promise<Problems> {
    const updatedProblems: Problems = await this.problemsService.preload(problems);
    if (!updatedProblems) {
      throw new NotFoundException(`Problems with ID "${problems.id}" not found`);
    }
    return this.problemsService.save(updatedProblems);
  }

  async removeProblems(id: number) {
    return await this.problemsService.delete(id);
  }
}
