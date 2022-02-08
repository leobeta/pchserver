import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { CaseHistoryModule } from './modules/case-history/case-history.module';
import { ClinicalEvaluationProcessModule } from './modules/clinical-evaluation-process/clinical-evaluation-process.module';
import { ComplaintsModule } from './modules/complaints/complaints.module';
import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';
import { MolarRelationshipProblemModule } from './modules/molar-relationship-problems/molar-relationship-problem.module';
import { ProblemsModule } from './modules/problems/problems.module';
import { UsersModule } from './modules/users/users.module';
import { DevelopmentFactorsModule } from './modules/development-factors/development-factors.module';
import { MultiaxialEvaluationPreferentialDiagnosisModule } from './modules/multiaxial-evaluation-preferential-diagnosis/multiaxial-evaluation-preferential-diagnosis.module';
import { ClinicalFormulationModule } from './modules/clinical-formulation/clinical-formulation.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    CaseHistoryModule,
    ComplaintsModule,
    ProblemsModule,
    MolarRelationshipProblemModule,
    ClinicalEvaluationProcessModule,
    DevelopmentFactorsModule,
    MultiaxialEvaluationPreferentialDiagnosisModule,
    ClinicalFormulationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static port: number;
  constructor(private readonly configService: ConfigService) {
    AppModule.port = Number(this.configService.get('PORT'));
  }
}
