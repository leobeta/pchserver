import { MolarRelationshipProblems } from './entities/molar-relationship-problems.entity';
import { MolarRelationshipProblemService } from './molar-relationship-problem.service';
import { Controller, Get, NotFoundException, Query, UseGuards, Post, Patch, Delete } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  CreateMolarRelationshipProblemsDto,
  PaginationMolarRelationshipProblemsDto,
  UpdateMolarRelationshipProblemsDto,
} from './dto';

@Controller('molar-relationship-problem')
export class MolarRelationshipProblemController {
  constructor(private readonly molarRelationshipProblemService: MolarRelationshipProblemService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllMolarRelationshipProblems(
    @Query() pagination?: PaginationMolarRelationshipProblemsDto,
  ): Promise<MolarRelationshipProblems[]> {
    return this.molarRelationshipProblemService.getAllMolarRelationshipProblems(pagination);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getMolarRelationshipProblem(@Query('id') id: number): Promise<MolarRelationshipProblems> {
    const molarRelationshipProblem = await this.molarRelationshipProblemService.getMolarRelationshipProblem(id);
    if (!molarRelationshipProblem) {
      throw new NotFoundException(`MolarRelationshipProblem with ID "${id}" not found`);
    }
    return molarRelationshipProblem;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createMolarRelationshipProblem(
    molarRelationshipProblems: CreateMolarRelationshipProblemsDto,
  ): Promise<MolarRelationshipProblems> {
    return this.molarRelationshipProblemService.createMolarRelationshipProblem(molarRelationshipProblems);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateMolarRelationshipProblem(
    molarRelationshipProblems: UpdateMolarRelationshipProblemsDto,
  ): Promise<MolarRelationshipProblems> {
    return this.molarRelationshipProblemService.updateMolarRelationshipProblem(molarRelationshipProblems);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeMolarRelationshipProblem(@Query('id') id: number): Promise<void> {
    await this.molarRelationshipProblemService.removeMolarRelationshipProblem(id);
  }
}
