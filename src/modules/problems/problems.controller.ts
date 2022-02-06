import { Body, Controller, Delete, Get, NotFoundException, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateProblemsDto, PaginationProblemsDto, UpdateProblemsDto } from './dto';
import { Problems } from './entities';
import { ProblemsService } from './problems.service';

@Controller('problems')
export class ProblemsController {
  constructor(private readonly problemsService: ProblemsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAllProblems(@Query() pagination: PaginationProblemsDto): Promise<Problems[]> {
    return this.problemsService.findAllProblems(pagination);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findProblemsById(@Query('id') id: number): Promise<Problems> {
    const problem = await this.problemsService.findProblemsById(id);
    if (!problem) {
      throw new NotFoundException(`Problems with ID "${id}" not found`);
    }
    return problem;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createProblems(@Body() problems: CreateProblemsDto): Promise<Problems> {
    return this.problemsService.createProblems(problems);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateProblems(@Body() problems: UpdateProblemsDto): Promise<Problems> {
    return this.problemsService.updateProblems(problems);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeProblems(@Query('id') id: number): Promise<void> {
    await this.problemsService.removeProblems(id);
  }
}
