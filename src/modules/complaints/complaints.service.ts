import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationComplaintsDto } from './dto';
import { Complaints } from './entities';

@Injectable()
export class ComplaintsService {
  constructor(
    @InjectRepository(Complaints)
    private readonly complaintsService: Repository<Complaints>,
  ) { }

  async findAllComplaints({
    limit,
    offset,
  }: PaginationComplaintsDto): Promise<Complaints[]> {
    return this.complaintsService.find({
      relations: ['case_history'],
      skip: offset,
      take: limit,
    });
  }

  async findComplaintsById(id: number): Promise<Complaints> {
    const complaint = await this.complaintsService.findOne(id, {
      relations: ['case_history'],
    });
    if (!complaint) {
      throw new NotFoundException(`Complaints with ID "${id}" not found`);
    }
    return complaint;
  }

  async createComplaints(complaints: Complaints): Promise<Complaints> {
    const newComplaints: Complaints = this.complaintsService.create(complaints);
    return await this.complaintsService.save(newComplaints);
  }

  async updateComplaints(complaints: Complaints): Promise<Complaints> {
    const updatedComplaints: Complaints = await this.complaintsService.preload(
      complaints,
    );
    if (!updatedComplaints) {
      throw new NotFoundException(
        `Complaints with ID "${complaints.id}" not found`,
      );
    }
    return this.complaintsService.save(updatedComplaints);
  }

  async removeComplaints(id: number) {
    return await this.complaintsService.delete(id);
  }
}
