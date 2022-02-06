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

@Entity('development_factors')
export class DevelopmentFactors extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column('text')
  description: string;

  @ManyToOne(() => CaseHistory, (caseHistory) => caseHistory.developmentFactors)
  @JoinColumn({ name: 'case_history_id' })
  caseHistory: CaseHistory;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
