import { PaginationCaseHistoryDto } from './dto/pagination-case-history.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CaseHistory } from './entities';

@Injectable()
export class CaseHistoryService {
  constructor(
    @InjectRepository(CaseHistory)
    private readonly caseHistoryRepository: Repository<CaseHistory>,
  ) { }

  async getAllCaseHistory({
    limit,
    offset,
  }: PaginationCaseHistoryDto): Promise<CaseHistory[]> {
    return this.caseHistoryRepository.find({ skip: offset, take: limit });
  }

  async getCaseHistory(id: number): Promise<CaseHistory> {
    const caseHistory = await this.caseHistoryRepository.findOne(id, {
      relations: ['complaints'],
    });
    if (!caseHistory) {
      throw new NotFoundException(`CaseHistory with ID "${id}" not found`);
    }
    return caseHistory;
  }

  async createCaseHistory(caseHistory: CaseHistory): Promise<CaseHistory> {
    const newCaseHistory = this.caseHistoryRepository.create(caseHistory);
    return await this.caseHistoryRepository.save(newCaseHistory);
  }

  async updateCaseHistory(caseHistory: CaseHistory): Promise<CaseHistory> {
    const updatedCaseHistory = await this.caseHistoryRepository.preload({
      ...caseHistory,
    });
    if (!updatedCaseHistory) {
      throw new NotFoundException(
        `CaseHistory with ID "${caseHistory.id}" not found`,
      );
    }
    return this.caseHistoryRepository.save(updatedCaseHistory);
  }

  async removeCaseHistory(id: number) {
    return await this.caseHistoryRepository.delete(id);
  }
}
