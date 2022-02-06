import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateComplaintsDto, PaginationComplaintsDto, UpdateComplaintsDto } from './dto';
import { Complaints } from './entities';

@Injectable()
export class ComplaintsService {
  constructor(
    @InjectRepository(Complaints)
    private readonly complaintsRepository: Repository<Complaints>,
  ) {}

  async findAllComplaints({ limit, offset }: PaginationComplaintsDto): Promise<Complaints[]> {
    return this.complaintsRepository.find({
      relations: ['case_history'],
      skip: offset,
      take: limit,
    });
  }

  async findComplaintsById(id: number): Promise<Complaints> {
    const complaint = await this.complaintsRepository.findOne(id, {
      relations: ['case_history'],
    });
    if (!complaint) {
      throw new NotFoundException(`Complaints with ID "${id}" not found`);
    }
    return complaint;
  }

  async createComplaints(complaints: CreateComplaintsDto): Promise<Complaints> {
    const newComplaints: Complaints = this.complaintsRepository.create(complaints);
    return await this.complaintsRepository.save(newComplaints);
  }

  async updateComplaints(complaints: UpdateComplaintsDto): Promise<Complaints> {
    const updatedComplaints: Complaints = await this.complaintsRepository.preload(complaints);
    if (!updatedComplaints) {
      throw new NotFoundException(`Complaints with ID "${complaints.id}" not found`);
    }
    return this.complaintsRepository.save(updatedComplaints);
  }

  async removeComplaints(id: number) {
    return await this.complaintsRepository.delete(id);
  }
}
