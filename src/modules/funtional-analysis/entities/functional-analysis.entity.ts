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

@Entity('functional_analysis')
export class FunctionalAnalysis extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  situation: string;

  @Column({ type: 'text' })
  answer: string;

  @Column({ type: 'text' })
  consequence: string;

  @ManyToOne(() => CaseHistory, (caseHistory) => caseHistory.functionalAnalysis, {
    cascade: true,
  })
  @JoinColumn({ name: 'case_history_id' })
  caseHistory: CaseHistory;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
