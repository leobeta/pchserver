import { CaseHistory } from '../case-history/entities';
import { Module } from '@nestjs/common';
import { MolarRelationshipProblemController } from './molar-relationship-problem.controller';
import { MolarRelationshipProblemService } from './molar-relationship-problem.service';
import { MolarRelationshipProblems } from './entities';
import { Problems } from '../problems/entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CaseHistory, Problems, MolarRelationshipProblems])],
  controllers: [MolarRelationshipProblemController],
  providers: [MolarRelationshipProblemService],
  exports: [MolarRelationshipProblemService],
})
export class MolarRelationshipProblemModule {}
