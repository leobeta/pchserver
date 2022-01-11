import {
  CreateCaseHistoryDto,
  UpdateCaseHistoryDto,
  PaginationCaseHistoryDto,
} from './dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CaseHistoryService } from './case-history.service';
import { CaseHistory } from './entities';

@Controller('case-history')
export class CaseHistoryController {
  constructor(private readonly caseHistoryService: CaseHistoryService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllCaseHistory(
    @Query() pagination?: PaginationCaseHistoryDto,
  ): Promise<CaseHistory[]> {
    return this.caseHistoryService.getAllCaseHistory(pagination);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getCaseHistory(@Query('id') id: number): Promise<CaseHistory> {
    const caseHistory = await this.caseHistoryService.getCaseHistory(id);
    if (!caseHistory) {
      throw new NotFoundException(`CaseHistory with ID "${id}" not found`);
    }
    return caseHistory;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createCaseHistory(
    @Body() caseHistory: CreateCaseHistoryDto,
  ): Promise<CaseHistory> {
    return this.caseHistoryService.createCaseHistory(caseHistory);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateCaseHistory(
    @Body() caseHistory: UpdateCaseHistoryDto,
  ): Promise<CaseHistory> {
    return this.caseHistoryService.updateCaseHistory(caseHistory);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeCaseHistory(@Query('id') id: number): Promise<void> {
    await this.caseHistoryService.removeCaseHistory(id);
  }
}
