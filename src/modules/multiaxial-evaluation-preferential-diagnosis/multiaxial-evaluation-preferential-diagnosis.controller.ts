import { CreateMultiaxialEvaluationPreferentialDiagnosisDto } from './dto/create-multiaxial-evaluation-preferential-diagnosis.dto';
import { PaginationMultiaxialEvaluationPreferentialDiagnosisDto } from './dto/pagination-multiaxial-evaluation-preferential-diagnosis.dto';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { MultiaxialEvaluationPreferentialDiagnosisService } from './multiaxial-evaluation-preferential-diagnosis.service';
import { Body, Controller, Delete, Get, NotFoundException, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { MultiaxialEvaluationPreferentialDiagnosis } from './entities';
import { UpdateMultiaxialEvaluationPreferentialDiagnosisDto } from './dto';

@Controller('multiaxial-evaluation-preferential-diagnosis')
export class MultiaxialEvaluationPreferentialDiagnosisController {
  constructor(
    private readonly multiaxialEvaluationPreferentialDiagnosisService: MultiaxialEvaluationPreferentialDiagnosisService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAllMultiaxialEvaluationPreferentialDiagnosis(
    @Query() pagination: PaginationMultiaxialEvaluationPreferentialDiagnosisDto,
  ): Promise<MultiaxialEvaluationPreferentialDiagnosis[]> {
    return this.multiaxialEvaluationPreferentialDiagnosisService.findAllMultiaxialEvaluationPreferentialDiagnosis(
      pagination,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findMultiaxialEvaluationPreferentialDiagnosisById(
    @Query('id') id: number,
  ): Promise<MultiaxialEvaluationPreferentialDiagnosis> {
    const multiaxialEvaluationPreferentialDiagnosis =
      await this.multiaxialEvaluationPreferentialDiagnosisService.findMultiaxialEvaluationPreferentialDiagnosisById(id);
    if (!multiaxialEvaluationPreferentialDiagnosis) {
      throw new NotFoundException(`MultiaxialEvaluationPreferentialDiagnosis with ID "${id}" not found`);
    }
    return multiaxialEvaluationPreferentialDiagnosis;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createMultiaxialEvaluationPreferentialDiagnosis(
    @Body() multiaxialEvaluationPreferentialDiagnosis: CreateMultiaxialEvaluationPreferentialDiagnosisDto,
  ): Promise<MultiaxialEvaluationPreferentialDiagnosis> {
    return this.multiaxialEvaluationPreferentialDiagnosisService.createMultiaxialEvaluationPreferentialDiagnosis(
      multiaxialEvaluationPreferentialDiagnosis,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateMultiaxialEvaluationPreferentialDiagnosis(
    @Body() multiaxialEvaluationPreferentialDiagnosis: UpdateMultiaxialEvaluationPreferentialDiagnosisDto,
  ): Promise<MultiaxialEvaluationPreferentialDiagnosis> {
    return this.multiaxialEvaluationPreferentialDiagnosisService.updateMultiaxialEvaluationPreferentialDiagnosis(
      multiaxialEvaluationPreferentialDiagnosis,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeMultiaxialEvaluationPreferentialDiagnosis(@Query('id') id: number): Promise<void> {
    await this.multiaxialEvaluationPreferentialDiagnosisService.removeMultiaxialEvaluationPreferentialDiagnosis(id);
  }
}
