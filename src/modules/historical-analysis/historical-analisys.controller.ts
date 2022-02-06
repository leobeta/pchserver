import { Controller, Delete, Get, NotFoundException, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateHistoricalAnalysisDto, PaginationHistoricalAnalysisDto, UpdateHistoricalAnalysisDto } from './dto';
import { HistoricalAnalysis } from './entities';
import { HistoricalAnalysisService } from './historical-analysis.service';

@Controller('historical-analysis')
export class HistoricalAnalysisController {
  constructor(private readonly historicalAnalysisService: HistoricalAnalysisService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllHistoricalAnalysis(@Query() pagination?: PaginationHistoricalAnalysisDto): Promise<HistoricalAnalysis[]> {
    return this.historicalAnalysisService.getAllHistoricalAnalysis(pagination);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getHistoricalAnalysis(@Query('id') id: number): Promise<HistoricalAnalysis> {
    const historicalAnalysis = await this.historicalAnalysisService.getHistoricalAnalysis(id);
    if (!historicalAnalysis) {
      throw new NotFoundException(`HistoricalAnalysis with ID "${id}" not found`);
    }
    return historicalAnalysis;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createHistoricalAnalysis(historicalAnalysis: CreateHistoricalAnalysisDto): Promise<HistoricalAnalysis> {
    return this.historicalAnalysisService.createHistoricalAnalysis(historicalAnalysis);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateHistoricalAnalysis(historicalAnalysis: UpdateHistoricalAnalysisDto): Promise<HistoricalAnalysis> {
    return this.historicalAnalysisService.updateHistoricalAnalysis(historicalAnalysis);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeHistoricalAnalysis(@Query('id') id: number): Promise<void> {
    await this.historicalAnalysisService.removeHistoricalAnalysis(id);
  }
}
