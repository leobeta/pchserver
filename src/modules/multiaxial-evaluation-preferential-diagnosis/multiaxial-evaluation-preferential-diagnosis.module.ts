import { Module } from '@nestjs/common';
import { MultiaxialEvaluationPreferentialDiagnosis } from './entities';
import { MultiaxialEvaluationPreferentialDiagnosisController } from './multiaxial-evaluation-preferential-diagnosis.controller';
import { MultiaxialEvaluationPreferentialDiagnosisService } from './multiaxial-evaluation-preferential-diagnosis.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MultiaxialEvaluationPreferentialDiagnosis])],
  controllers: [MultiaxialEvaluationPreferentialDiagnosisController],
  providers: [MultiaxialEvaluationPreferentialDiagnosisService],
  exports: [MultiaxialEvaluationPreferentialDiagnosisService],
})
export class MultiaxialEvaluationPreferentialDiagnosisModule {}
