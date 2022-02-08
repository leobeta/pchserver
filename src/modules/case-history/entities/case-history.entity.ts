import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ClinicalEvaluationProcess } from './../../clinical-evaluation-process/entities';
import { ClinicalFormulation } from './../../clinical-formulation/entities';
import { Complaints } from '../../complaints/entities';
import { DevelopmentFactors } from './../../development-factors/entities/deveopment-factors.entity';
import { FunctionalAnalysis } from '../../funtional-analysis/entities';
import { Genre } from '../../../common/enum';
import { HistoricalAnalysis } from './../../historical-analysis/entities';
import { MolarRelationshipProblems } from '../../molar-relationship-problems/entities';
import { MultiaxialEvaluationPreferentialDiagnosis } from './../../multiaxial-evaluation-preferential-diagnosis/entities';
import { Problems } from '../../problems/entities';
import { User } from '../../users/entities';

@Entity({ name: 'case_history' })
export class CaseHistory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  identification: string;

  @Column({ type: 'date' })
  dob: Date;

  @Column({ type: 'enum', enum: Genre })
  genre: Genre;

  @Column({ nullable: true })
  scolarshipLevel: string;

  @Column({ nullable: true })
  occupation: string;

  @Column({ nullable: true })
  origin: string;

  @Column({ nullable: true })
  religion: string;

  @Column({ nullable: true, type: 'text' })
  initialContact: string;

  @Column({ nullable: true, type: 'text' })
  reason: string;

  @OneToMany(() => Complaints, (complaints) => complaints.caseHistory)
  complaints: Complaints[];

  @OneToMany(() => Problems, (problems) => problems.caseHistory)
  problems: Problems[];

  @OneToMany(() => FunctionalAnalysis, (functionalAnalysis) => functionalAnalysis.caseHistory)
  functionalAnalysis: FunctionalAnalysis[];

  @OneToMany(() => MolarRelationshipProblems, (molarRelationshipProblems) => molarRelationshipProblems.caseHistory)
  molarRelationshipProblems: MolarRelationshipProblems[];

  @OneToMany(() => HistoricalAnalysis, (historicalAnalysis) => historicalAnalysis.caseHistory)
  historicalAnalysis: HistoricalAnalysis;

  @OneToMany(() => ClinicalEvaluationProcess, (clinicalEvaluationProcess) => clinicalEvaluationProcess.caseHistory)
  clinicalEvaluationProcess: ClinicalEvaluationProcess;

  @OneToMany(() => DevelopmentFactors, (developmentFactors) => developmentFactors.caseHistory)
  developmentFactors: DevelopmentFactors[];

  @OneToMany(
    () => MultiaxialEvaluationPreferentialDiagnosis,
    (multiaxialEvaluationPreferentialDiagnosis) => multiaxialEvaluationPreferentialDiagnosis.caseHistory,
  )
  multiaxialEvaluationPreferentialDiagnosis: MultiaxialEvaluationPreferentialDiagnosis[];

  @OneToMany(() => ClinicalFormulation, (clinicalFormulation) => clinicalFormulation.caseHistory)
  clinicalFormulation: ClinicalFormulation;

  @ManyToOne(() => User, (user) => user.caseHistory, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
