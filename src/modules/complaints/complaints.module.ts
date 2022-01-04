import { Complaints } from './entities/complaints.entity';
import { ComplaintsController } from './complaints.controller';
import { ComplaintsService } from './complaints.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Complaints])],
  providers: [ComplaintsService],
  controllers: [ComplaintsController],
})
export class ComplaintsModule { }
