import { ClinicalEvaluationProcess } from './entities';
import { ClinicalEvaluationProcessController } from './clinical-evaluation-process.controller';
import { ClinicalEvaluationProcessService } from './clinical-evaluation-process.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([ClinicalEvaluationProcess])],
  controllers: [ClinicalEvaluationProcessController],
  providers: [ClinicalEvaluationProcessService],
  exports: [ClinicalEvaluationProcessService],
})
export class ClinicalEvaluationProcessModule {}
