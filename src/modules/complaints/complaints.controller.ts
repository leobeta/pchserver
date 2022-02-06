import { ComplaintsService } from './complaints.service';
import { PaginationComplaintsDto } from './dto/pagination-complaints.dto';
import { Body, Controller, Delete, Get, NotFoundException, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Complaints } from './entities';
import { CreateComplaintsDto, UpdateComplaintsDto } from './dto';

@Controller('complaints')
export class ComplaintsController {
  constructor(private readonly complaintsService: ComplaintsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAllComplaints(@Query() pagination: PaginationComplaintsDto): Promise<Complaints[]> {
    return this.complaintsService.findAllComplaints(pagination);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findComplaintsById(@Query('id') id: number): Promise<Complaints> {
    const complaint = await this.complaintsService.findComplaintsById(id);
    if (!complaint) {
      throw new NotFoundException(`Complaints with ID "${id}" not found`);
    }
    return complaint;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createComplaints(@Body() complaint: CreateComplaintsDto): Promise<Complaints> {
    return this.complaintsService.createComplaints(complaint);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateComplaints(@Body() complaint: UpdateComplaintsDto): Promise<Complaints> {
    return this.complaintsService.updateComplaints(complaint);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeComplaints(@Query('id') id: number): Promise<void> {
    await this.complaintsService.removeComplaints(id);
  }
}
