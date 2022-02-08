import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClinicalFormulationDto, PaginationClinicalFormulationDto, UpdateClinicalFormulationDto } from './dto';
import { ClinicalFormulation } from './entities';

@Injectable()
export class ClinicalFormulationService {
  constructor(
    @InjectRepository(ClinicalFormulation)
    private readonly clinicalFormulationRepository: Repository<ClinicalFormulation>,
  ) { }

  async findAllClinicalFormulations({
    limit,
    offset,
  }: PaginationClinicalFormulationDto): Promise<ClinicalFormulation[]> {
    return await this.clinicalFormulationRepository.find({
      relations: ['caseHistory'],
      take: limit,
      skip: offset,
    });
  }

  async findClinicalFormulationById(id: number): Promise<ClinicalFormulation> {
    return await this.clinicalFormulationRepository.findOne(id, {
      relations: ['caseHistory'],
    });
  }

  async createClinicalFormulation(clinicalFormulation: CreateClinicalFormulationDto): Promise<ClinicalFormulation> {
    const newClinicalFormulation: ClinicalFormulation = this.clinicalFormulationRepository.create(clinicalFormulation);
    return await this.clinicalFormulationRepository.save(newClinicalFormulation);
  }

  async updateClinicalFormulation(clinicalFormulation: UpdateClinicalFormulationDto): Promise<ClinicalFormulation> {
    const updatedClinicalFormulation: ClinicalFormulation = await this.clinicalFormulationRepository.preload(
      clinicalFormulation,
    );
    if (!updatedClinicalFormulation) {
      throw new NotFoundException(`ClinicalFormulation with ID "${clinicalFormulation.id}" not found`);
    }
    return this.clinicalFormulationRepository.save(updatedClinicalFormulation);
  }

  async removeClinicalFormulation(id: number) {
    return await this.clinicalFormulationRepository.delete(id);
  }
}
