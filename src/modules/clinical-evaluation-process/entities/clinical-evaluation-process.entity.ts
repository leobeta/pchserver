import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { CaseHistory } from 'src/modules/case-history/entities';

@Entity('clinical_evaluation_process')
export class ClinicalEvaluationProcess extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  clinicalEvaluationProcess: string;

  @ManyToOne(() => CaseHistory, (caseHistory) => caseHistory.clinicalEvaluationProcess)
  @JoinColumn({ name: 'case_history_id' })
  caseHistory: CaseHistory;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
