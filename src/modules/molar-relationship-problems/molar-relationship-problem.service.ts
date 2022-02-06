import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Problems } from '../problems/entities';
import {
  CreateMolarRelationshipProblemsDto,
  PaginationMolarRelationshipProblemsDto,
  UpdateMolarRelationshipProblemsDto,
} from './dto';
import { MolarRelationshipProblems } from './entities';

@Injectable()
export class MolarRelationshipProblemService {
  constructor(
    @InjectRepository(MolarRelationshipProblems)
    private readonly molarRelationshipProblemRepository: Repository<MolarRelationshipProblems>,
    @InjectRepository(Problems)
    private readonly problemsRepository: Repository<Problems>,
  ) {}

  async getAllMolarRelationshipProblems({
    limit,
    offset,
  }: PaginationMolarRelationshipProblemsDto): Promise<MolarRelationshipProblems[]> {
    return this.molarRelationshipProblemRepository.find({
      relations: ['problems'],
      skip: offset,
      take: limit,
    });
  }

  async getMolarRelationshipProblem(id: number): Promise<MolarRelationshipProblems> {
    const molarRelationshipProblem = await this.molarRelationshipProblemRepository.findOne(id, {
      relations: ['problems'],
    });
    if (!molarRelationshipProblem) {
      throw new NotFoundException(`MolarRelationshipProblem with ID "${id}" not found`);
    }
    return molarRelationshipProblem;
  }

  async createMolarRelationshipProblem(
    molarRelationshipProblem: CreateMolarRelationshipProblemsDto,
  ): Promise<MolarRelationshipProblems> {
    const newMolarRelationshipProblem: MolarRelationshipProblems =
      this.molarRelationshipProblemRepository.create(molarRelationshipProblem);
    return await this.molarRelationshipProblemRepository.save(newMolarRelationshipProblem);
  }

  async updateMolarRelationshipProblem(
    molarRelationshipProblem: UpdateMolarRelationshipProblemsDto,
  ): Promise<MolarRelationshipProblems> {
    const UpdateMolarRelationshipProblems: MolarRelationshipProblems =
      await this.molarRelationshipProblemRepository.preload(molarRelationshipProblem);
    if (!UpdateMolarRelationshipProblems) {
      throw new NotFoundException(`MolarRelationshipProblem with ID "${molarRelationshipProblem.id}" not found`);
    }
    return this.molarRelationshipProblemRepository.save(UpdateMolarRelationshipProblems);
  }

  async removeMolarRelationshipProblem(id: number) {
    return await this.molarRelationshipProblemRepository.delete(id);
  }
}
