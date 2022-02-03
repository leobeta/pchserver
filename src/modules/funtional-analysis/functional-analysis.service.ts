import { PaginationFunctionalAnalysisDto } from './dto/pagination-functional-analysis.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { FunctionalAnalysis } from './entities';
import { Repository } from 'typeorm';

@Injectable()
export class FunctionalAnalysisService {
  constructor(
    @InjectRepository(FunctionalAnalysis)
    private readonly functionalAnalysisRepository: Repository<FunctionalAnalysis>,
  ) { }

  async getAllFunctionalAnalysis({ limit, offset }: PaginationFunctionalAnalysisDto): Promise<FunctionalAnalysis[]> {
    return this.functionalAnalysisRepository.find({
      relations: ['case_history'],
      skip: offset,
      take: limit,
    });
  }

  async getFunctionalAnalysis(id: number): Promise<FunctionalAnalysis> {
    const functionalAnalysis = await this.functionalAnalysisRepository.findOne(id);
    if (!functionalAnalysis) {
      throw new NotFoundException(`FunctionalAnalysis with ID "${id}" not found`);
    }
    return functionalAnalysis;
  }

  async createFunctionalAnalysis(functionalAnalysis: FunctionalAnalysis): Promise<FunctionalAnalysis> {
    const newFunctionalAnalysis: FunctionalAnalysis = this.functionalAnalysisRepository.create(functionalAnalysis);
    return await this.functionalAnalysisRepository.save(newFunctionalAnalysis);
  }

  async updateFunctionalAnalysis(functionalAnalysis: FunctionalAnalysis): Promise<FunctionalAnalysis> {
    const updatedFunctionalAnalysis: FunctionalAnalysis = await this.functionalAnalysisRepository.preload(functionalAnalysis);
    if (!updatedFunctionalAnalysis) {
      throw new NotFoundException(`FunctionalAnalysis with ID "${functionalAnalysis.id}" not found`);
    }
    return this.functionalAnalysisRepository.save(updatedFunctionalAnalysis);
  }

  async removeFunctionalAnalysis(id: number) {
    return await this.functionalAnalysisRepository.delete(id);
  }
}
