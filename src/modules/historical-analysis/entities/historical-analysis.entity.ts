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

@Entity('historical_analysis')
export class HistoricalAnalysis extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  personalHistory: string;

  @Column({ type: 'text' })
  familyHistory: string;

  @Column({ type: 'text' })
  academicHistory: string;

  @Column({ type: 'text' })
  socioAfectiveHistory: string;

  @Column({ type: 'text' })
  sexualHistory: string;

  @Column({ type: 'text' })
  problemHistory: string;

  @ManyToOne(() => CaseHistory, (caseHistory) => caseHistory.historicalAnalysis, {
    cascade: true,
  })
  @JoinColumn({ name: 'case_history_id' })
  caseHistory: CaseHistory;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
