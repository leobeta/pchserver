import { CaseHistory } from './entities';
import { CaseHistoryController } from './case-history.controller';
import { CaseHistoryService } from './case-history.service';
import { Complaints } from './../complaints/entities';
import { FunctionalAnalysis } from './../funtional-analysis/entities';
import { Module } from '@nestjs/common';
import { Problems } from './../problems/entities/problems.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities';

@Module({
  imports: [TypeOrmModule.forFeature([CaseHistory, User, Complaints, Problems, FunctionalAnalysis])],
  providers: [CaseHistoryService],
  controllers: [CaseHistoryController],
})
export class CaseHistoryModule { }
