import { UpdateMultiaxialEvaluationPreferentialDiagnosisDto } from './dto/update-multiaxial-evaluation-preferential-diagnosis.dto';
import { CreateMultiaxialEvaluationPreferentialDiagnosisDto } from './dto/create-multiaxial-evaluation-preferential-diagnosis.dto';
import { PaginationMultiaxialEvaluationPreferentialDiagnosisDto } from './dto/pagination-multiaxial-evaluation-preferential-diagnosis.dto';
import { MultiaxialEvaluationPreferentialDiagnosis } from './entities';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MultiaxialEvaluationPreferentialDiagnosisService {
  constructor(
    @InjectRepository(MultiaxialEvaluationPreferentialDiagnosis)
    private readonly multiaxialEvaluationPreferentialDiagnosisRepository: Repository<MultiaxialEvaluationPreferentialDiagnosis>,
  ) { }

  async findAllMultiaxialEvaluationPreferentialDiagnosis({
    limit,
    offset,
  }: PaginationMultiaxialEvaluationPreferentialDiagnosisDto): Promise<MultiaxialEvaluationPreferentialDiagnosis[]> {
    return this.multiaxialEvaluationPreferentialDiagnosisRepository.find({
      relations: ['case_history'],
      skip: offset,
      take: limit,
    });
  }

  async findMultiaxialEvaluationPreferentialDiagnosisById(
    id: number,
  ): Promise<MultiaxialEvaluationPreferentialDiagnosis> {
    const multiaxialEvaluationPreferentialDiagnosis =
      await this.multiaxialEvaluationPreferentialDiagnosisRepository.findOne(id, {
        relations: ['case_history'],
      });
    if (!multiaxialEvaluationPreferentialDiagnosis) {
      throw new NotFoundException(`MultiaxialEvaluationPreferentialDiagnosis with ID "${id}" not found`);
    }
    return multiaxialEvaluationPreferentialDiagnosis;
  }

  async createMultiaxialEvaluationPreferentialDiagnosis(
    multiaxialEvaluationPreferentialDiagnosis: CreateMultiaxialEvaluationPreferentialDiagnosisDto,
  ): Promise<MultiaxialEvaluationPreferentialDiagnosis> {
    const newMultiaxialEvaluationPreferentialDiagnosis: MultiaxialEvaluationPreferentialDiagnosis =
      this.multiaxialEvaluationPreferentialDiagnosisRepository.create(multiaxialEvaluationPreferentialDiagnosis);
    return await this.multiaxialEvaluationPreferentialDiagnosisRepository.save(
      newMultiaxialEvaluationPreferentialDiagnosis,
    );
  }

  async updateMultiaxialEvaluationPreferentialDiagnosis(
    multiaxialEvaluationPreferentialDiagnosis: UpdateMultiaxialEvaluationPreferentialDiagnosisDto,
  ): Promise<MultiaxialEvaluationPreferentialDiagnosis> {
    const updatedMultiaxialEvaluationPreferentialDiagnosis: MultiaxialEvaluationPreferentialDiagnosis =
      await this.multiaxialEvaluationPreferentialDiagnosisRepository.preload(multiaxialEvaluationPreferentialDiagnosis);
    if (!updatedMultiaxialEvaluationPreferentialDiagnosis) {
      throw new NotFoundException(
        `MultiaxialEvaluationPreferentialDiagnosis with ID "${multiaxialEvaluationPreferentialDiagnosis.id}" not found`,
      );
    }
    return this.multiaxialEvaluationPreferentialDiagnosisRepository.save(
      updatedMultiaxialEvaluationPreferentialDiagnosis,
    );
  }

  async removeMultiaxialEvaluationPreferentialDiagnosis(id: number) {
    return await this.multiaxialEvaluationPreferentialDiagnosisRepository.delete(id);
  }
}
