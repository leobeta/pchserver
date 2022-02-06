import { Problems } from 'src/modules/problems/entities/problems.entity';
import { UpdateCaseHistoryDto, CreateCaseHistoryDto, PaginationCaseHistoryDto } from './dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CaseHistory } from './entities';
import { User } from '../users/entities';
import { Complaints } from '../complaints/entities';

@Injectable()
export class CaseHistoryService {
  constructor(
    @InjectRepository(CaseHistory)
    private readonly caseHistoryRepository: Repository<CaseHistory>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Complaints)
    private readonly complaintsRepository: Repository<Complaints>,
    @InjectRepository(Problems)
    private readonly problemsRepository: Repository<Problems>,
  ) {}

  async getAllCaseHistory({ limit, offset }: PaginationCaseHistoryDto): Promise<CaseHistory[]> {
    return this.caseHistoryRepository.find({
      relations: ['complaints'],
      skip: offset,
      take: limit,
    });
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

  async createCaseHistory(caseHistory: CreateCaseHistoryDto): Promise<CaseHistory> {
    const newCaseHistory: CaseHistory = this.caseHistoryRepository.create(caseHistory);
    return await this.caseHistoryRepository.save(newCaseHistory);
  }

  async updateCaseHistory(caseHistory: UpdateCaseHistoryDto): Promise<CaseHistory> {
    const updatedCaseHistory: CaseHistory = await this.caseHistoryRepository.preload(caseHistory);
    if (!updatedCaseHistory) {
      throw new NotFoundException(`CaseHistory with ID "${caseHistory.id}" not found`);
    }
    return this.caseHistoryRepository.save(updatedCaseHistory);
  }

  async removeCaseHistory(id: number) {
    return await this.caseHistoryRepository.delete(id);
  }
}
