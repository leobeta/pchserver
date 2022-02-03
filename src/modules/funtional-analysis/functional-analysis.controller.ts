import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { Controller, Get, NotFoundException, Post, Query, UseGuards, Patch, Delete } from '@nestjs/common';
import { FunctionalAnalysisService } from './functional-analysis.service';
import { PaginationFunctionalAnalysisDto } from './dto/pagination-functional-analysis.dto';
import { FunctionalAnalysis } from './entities';

@Controller('functional-analysis')
export class FunctionalAnalysisController {
  constructor(private readonly functionalAnalysisService: FunctionalAnalysisService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllFunctionalAnalysis(@Query() pagination?: PaginationFunctionalAnalysisDto): Promise<FunctionalAnalysis[]> {
    return this.functionalAnalysisService.getAllFunctionalAnalysis(pagination);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getFunctionalAnalysis(@Query('id') id: number): Promise<FunctionalAnalysis> {
    const functionalAnalysis = await this.functionalAnalysisService.getFunctionalAnalysis(id);
    if (!functionalAnalysis) {
      throw new NotFoundException(`FunctionalAnalysis with ID "${id}" not found`);
    }
    return functionalAnalysis;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createFunctionalAnalysis(functionalAnalysis: FunctionalAnalysis): Promise<FunctionalAnalysis> {
    return this.functionalAnalysisService.createFunctionalAnalysis(functionalAnalysis);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateFunctionalAnalysis(functionalAnalysis: FunctionalAnalysis): Promise<FunctionalAnalysis> {
    return this.functionalAnalysisService.updateFunctionalAnalysis(functionalAnalysis);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeFunctionalAnalysis(@Query('id') id: number): Promise<void> {
    await this.functionalAnalysisService.removeFunctionalAnalysis(id);
  }
}
