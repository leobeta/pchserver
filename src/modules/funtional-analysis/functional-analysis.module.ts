import { FunctionalAnalysis } from './entities/functional-analysis.entity';
import { FunctionalAnalysisController } from './functional-analysis.controller';
import { FunctionalAnalysisService } from './functional-analysis.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([FunctionalAnalysis])],
  providers: [FunctionalAnalysisService],
  controllers: [FunctionalAnalysisController],
  exports: [FunctionalAnalysisService],
})
export class FunctionalAnalysisModule { }
