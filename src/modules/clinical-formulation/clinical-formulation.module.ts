import { ClinicalFormulation } from './entities';
import { ClinicalFormulationController } from './clinical-formulation.controller';
import { ClinicalFormulationService } from './clinical-formulation.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ClinicalFormulation])],
  providers: [ClinicalFormulationService],
  controllers: [ClinicalFormulationController],
  exports: [ClinicalFormulationService],
})
export class ClinicalFormulationModule { }
