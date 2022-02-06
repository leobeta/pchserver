import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { Body, Controller, Get, NotFoundException, Post, Query, UseGuards, Patch, Delete } from '@nestjs/common';
import { ClinicalEvaluationProcessService } from './clinical-evaluation-process.service';
import {
  CreateClinicalEvaluationProcessDto,
  PaginationClinicalEvaluationProcessDto,
  UpdateClinicalEvaluationProcessDto,
} from './dto';
import { ClinicalEvaluationProcess } from './entities';

@Controller('clinical-evaluation-process')
export class ClinicalEvaluationProcessController {
  constructor(private readonly clinicalEvaluationProcessService: ClinicalEvaluationProcessService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAllClinicalEvaluationProcesses(
    @Query() pagination: PaginationClinicalEvaluationProcessDto,
  ): Promise<ClinicalEvaluationProcess[]> {
    return this.clinicalEvaluationProcessService.findAllClinicalEvaluationProcesses(pagination);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findClinicalEvaluationProcessById(@Query('id') id: number): Promise<ClinicalEvaluationProcess> {
    const clinicalEvaluationProcess = await this.clinicalEvaluationProcessService.findClinicalEvaluationProcessById(id);
    if (!clinicalEvaluationProcess) {
      throw new NotFoundException(`ClinicalEvaluationProcess with ID "${id}" not found`);
    }
    return clinicalEvaluationProcess;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createClinicalEvaluationProcess(
    @Body() clinicalEvaluationProcess: CreateClinicalEvaluationProcessDto,
  ): Promise<ClinicalEvaluationProcess> {
    return this.clinicalEvaluationProcessService.createClinicalEvaluationProcess(clinicalEvaluationProcess);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateClinicalEvaluationProcess(
    @Body() clinicalEvaluationProcess: UpdateClinicalEvaluationProcessDto,
  ): Promise<ClinicalEvaluationProcess> {
    return this.clinicalEvaluationProcessService.updateClinicalEvaluationProcess(clinicalEvaluationProcess);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeClinicalEvaluationProcess(@Query('id') id: number): Promise<void> {
    await this.clinicalEvaluationProcessService.removeClinicalEvaluationProcess(id);
  }
}
