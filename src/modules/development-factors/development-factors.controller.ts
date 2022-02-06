import { DevelopmentFactors } from './entities/deveopment-factors.entity';
import { DevelopmentFactorsService } from './development-factors.service';
import { Controller, Get, NotFoundException, Query, UseGuards, Post, Body, Delete, Patch } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateDevelopmentFactorsDto, PaginationDevelopmentFactorsDto, UpdateDevelopmentFactorsDto } from './dto';

@Controller('development-factors')
export class DevelopmentFactorsController {
  constructor(private readonly developmentFactorsService: DevelopmentFactorsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAllDevelopmentFactors(@Query() pagination: PaginationDevelopmentFactorsDto): Promise<DevelopmentFactors[]> {
    return this.developmentFactorsService.findAllDevelopmentFactors(pagination);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findDevelopmentFactorsById(@Query('id') id: number): Promise<DevelopmentFactors> {
    const developmentFactors = await this.developmentFactorsService.findDevelopmentFactorsById(id);
    if (!developmentFactors) {
      throw new NotFoundException(`DevelopmentFactors with ID "${id}" not found`);
    }
    return developmentFactors;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createDevelopmentFactors(@Body() developmentFactors: CreateDevelopmentFactorsDto): Promise<DevelopmentFactors> {
    return this.developmentFactorsService.createDevelopmentFactors(developmentFactors);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateDevelopmentFactors(@Body() developmentFactors: UpdateDevelopmentFactorsDto): Promise<DevelopmentFactors> {
    return this.developmentFactorsService.updateDevelopmentFactors(developmentFactors);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeDevelopmentFactors(@Query('id') id: number): Promise<void> {
    await this.developmentFactorsService.removeDevelopmentFactors(id);
  }
}
