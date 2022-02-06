import {
  CreateClinicalEvaluationProcessDto,
  PaginationClinicalEvaluationProcessDto,
  UpdateClinicalEvaluationProcessDto,
} from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ClinicalEvaluationProcess } from './entities';
import { Repository } from 'typeorm';

@Injectable()
export class ClinicalEvaluationProcessService {
  constructor(
    @InjectRepository(ClinicalEvaluationProcess)
    private readonly clinicalEvaluationProcessRepository: Repository<ClinicalEvaluationProcess>,
  ) {}

  async findAllClinicalEvaluationProcesses({
    limit,
    offset,
  }: PaginationClinicalEvaluationProcessDto): Promise<ClinicalEvaluationProcess[]> {
    return this.clinicalEvaluationProcessRepository.find({
      relations: ['case_history'],
      skip: offset,
      take: limit,
    });
  }

  async findClinicalEvaluationProcessById(id: number): Promise<ClinicalEvaluationProcess> {
    const clinicalEvaluationProcess = await this.clinicalEvaluationProcessRepository.findOne(id, {
      relations: ['case_history'],
    });
    if (!clinicalEvaluationProcess) {
      throw new NotFoundException(`ClinicalEvaluationProcess with ID "${id}" not found`);
    }
    return clinicalEvaluationProcess;
  }

  async createClinicalEvaluationProcess(
    clinicalEvaluationProcess: CreateClinicalEvaluationProcessDto,
  ): Promise<ClinicalEvaluationProcess> {
    const newClinicalEvaluationProcess: ClinicalEvaluationProcess =
      this.clinicalEvaluationProcessRepository.create(clinicalEvaluationProcess);
    return await this.clinicalEvaluationProcessRepository.save(newClinicalEvaluationProcess);
  }

  async updateClinicalEvaluationProcess(
    clinicalEvaluationProcess: UpdateClinicalEvaluationProcessDto,
  ): Promise<ClinicalEvaluationProcess> {
    const updatedClinicalEvaluationProcess: ClinicalEvaluationProcess =
      await this.clinicalEvaluationProcessRepository.preload(clinicalEvaluationProcess);
    if (!updatedClinicalEvaluationProcess) {
      throw new NotFoundException(`ClinicalEvaluationProcess with ID "${clinicalEvaluationProcess.id}" not found`);
    }
    return this.clinicalEvaluationProcessRepository.save(updatedClinicalEvaluationProcess);
  }

  async removeClinicalEvaluationProcess(id: number) {
    return await this.clinicalEvaluationProcessRepository.delete(id);
  }
}
