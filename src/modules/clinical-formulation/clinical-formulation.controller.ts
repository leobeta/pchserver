import { ClinicalFormulationService } from './clinical-formulation.service';
import { Controller, Get, Query, UseGuards, Post, Patch, Delete } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateClinicalFormulationDto, PaginationClinicalFormulationDto, UpdateClinicalFormulationDto } from './dto';
import { ClinicalFormulation } from './entities';

@Controller('clinical-formulation')
export class ClinicalFormulationController {
  constructor(private readonly clinicalFormulationService: ClinicalFormulationService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAllClinicalFormulations(
    @Query() pagination: PaginationClinicalFormulationDto,
  ): Promise<ClinicalFormulation[]> {
    return await this.clinicalFormulationService.findAllClinicalFormulations(pagination);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findClinicalFormulationById(id: number): Promise<ClinicalFormulation> {
    return await this.clinicalFormulationService.findClinicalFormulationById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createClinicalFormulation(clinicalFormulation: CreateClinicalFormulationDto): Promise<ClinicalFormulation> {
    return await this.clinicalFormulationService.createClinicalFormulation(clinicalFormulation);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateClinicalFormulation(clinicalFormulation: UpdateClinicalFormulationDto): Promise<ClinicalFormulation> {
    return await this.clinicalFormulationService.updateClinicalFormulation(clinicalFormulation);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeClinicalFormulation(id: number): Promise<void> {
    await this.clinicalFormulationService.removeClinicalFormulation(id);
  }
}
