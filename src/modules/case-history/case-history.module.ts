import { CaseHistory } from './entities';
import { CaseHistoryController } from './case-history.controller';
import { CaseHistoryService } from './case-history.service';
import { ClinicalEvaluationProcess } from './../clinical-evaluation-process/entities';
import { ClinicalFormulation } from '../clinical-formulation/entities';
import { Complaints } from '../complaints/entities';
import { FunctionalAnalysis } from '../funtional-analysis/entities';
import { HistoricalAnalysis } from '../historical-analysis/entities';
import { Module } from '@nestjs/common';
import { MolarRelationshipProblems } from '../molar-relationship-problems/entities';
import { MultiaxialEvaluationPreferentialDiagnosis } from '../multiaxial-evaluation-preferential-diagnosis/entities';
import { Problems } from '../problems/entities/problems.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CaseHistory,
      User,
      Complaints,
      Problems,
      FunctionalAnalysis,
      MolarRelationshipProblems,
      HistoricalAnalysis,
      ClinicalEvaluationProcess,
      MultiaxialEvaluationPreferentialDiagnosis,
      ClinicalFormulation,
    ]),
  ],
  providers: [CaseHistoryService],
  controllers: [CaseHistoryController],
})
export class CaseHistoryModule { }
