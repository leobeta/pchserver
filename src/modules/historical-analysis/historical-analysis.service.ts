import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHistoricalAnalysisDto, PaginationHistoricalAnalysisDto, UpdateHistoricalAnalysisDto } from './dto';
import { HistoricalAnalysis } from './entities';

@Injectable()
export class HistoricalAnalysisService {
  constructor(
    @InjectRepository(HistoricalAnalysis)
    private readonly historicalAnalysisRepository: Repository<HistoricalAnalysis>,
  ) {}

  async getAllHistoricalAnalysis({ limit, offset }: PaginationHistoricalAnalysisDto): Promise<HistoricalAnalysis[]> {
    return this.historicalAnalysisRepository.find({
      relations: ['case_history'],
      skip: offset,
      take: limit,
    });
  }

  async getHistoricalAnalysis(id: number): Promise<HistoricalAnalysis> {
    const historicalAnalysis = await this.historicalAnalysisRepository.findOne(id);
    if (!historicalAnalysis) {
      throw new NotFoundException(`HistoricalAnalysis with ID "${id}" not found`);
    }
    return historicalAnalysis;
  }

  async createHistoricalAnalysis(historicalAnalysis: CreateHistoricalAnalysisDto): Promise<HistoricalAnalysis> {
    const newHistoricalAnalysis: HistoricalAnalysis = this.historicalAnalysisRepository.create(historicalAnalysis);
    return await this.historicalAnalysisRepository.save(newHistoricalAnalysis);
  }

  async updateHistoricalAnalysis(historicalAnalysis: UpdateHistoricalAnalysisDto): Promise<HistoricalAnalysis> {
    const updatedHistoricalAnalysis: HistoricalAnalysis = await this.historicalAnalysisRepository.preload(
      historicalAnalysis,
    );
    if (!updatedHistoricalAnalysis) {
      throw new NotFoundException(`HistoricalAnalysis with ID "${historicalAnalysis.id}" not found`);
    }
    return this.historicalAnalysisRepository.save(updatedHistoricalAnalysis);
  }

  async removeHistoricalAnalysis(id: number) {
    return await this.historicalAnalysisRepository.delete(id);
  }
}
