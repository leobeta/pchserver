import { DevelopmentFactors } from './entities/deveopment-factors.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDevelopmentFactorsDto, PaginationDevelopmentFactorsDto, UpdateDevelopmentFactorsDto } from './dto';

@Injectable()
export class DevelopmentFactorsService {
  constructor(
    @InjectRepository(DevelopmentFactors) private readonly developmentFactorsRepository: Repository<DevelopmentFactors>,
  ) {}

  async findAllDevelopmentFactors({ limit, offset }: PaginationDevelopmentFactorsDto): Promise<DevelopmentFactors[]> {
    return this.developmentFactorsRepository.find({
      relations: ['case_history'],
      skip: offset,
      take: limit,
    });
  }

  async findDevelopmentFactorsById(id: number): Promise<DevelopmentFactors> {
    const developmentFactors = await this.developmentFactorsRepository.findOne(id, {
      relations: ['case_history'],
    });
    if (!developmentFactors) {
      throw new NotFoundException(`DevelopmentFactors with ID "${id}" not found`);
    }
    return developmentFactors;
  }

  async createDevelopmentFactors(developmentFactors: CreateDevelopmentFactorsDto): Promise<DevelopmentFactors> {
    const newDevelopmentFactors: DevelopmentFactors = this.developmentFactorsRepository.create(developmentFactors);
    return await this.developmentFactorsRepository.save(newDevelopmentFactors);
  }

  async updateDevelopmentFactors(developmentFactors: UpdateDevelopmentFactorsDto): Promise<DevelopmentFactors> {
    const updatedDevelopmentFactors: DevelopmentFactors = await this.developmentFactorsRepository.preload(
      developmentFactors,
    );
    if (!updatedDevelopmentFactors) {
      throw new NotFoundException(`DevelopmentFactors with ID "${developmentFactors.id}" not found`);
    }
    return this.developmentFactorsRepository.save(updatedDevelopmentFactors);
  }

  async removeDevelopmentFactors(id: number) {
    return await this.developmentFactorsRepository.delete(id);
  }
}
