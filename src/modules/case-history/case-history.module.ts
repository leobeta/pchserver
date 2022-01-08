import { CaseHistory } from './entities';
import { CaseHistoryController } from './case-history.controller';
import { CaseHistoryService } from './case-history.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities';

@Module({
  imports: [TypeOrmModule.forFeature([CaseHistory, User])],
  providers: [CaseHistoryService],
  controllers: [CaseHistoryController],
})
export class CaseHistoryModule { }
