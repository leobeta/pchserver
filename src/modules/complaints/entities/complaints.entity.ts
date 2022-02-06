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

import { CaseHistory } from '../../case-history/entities/case-history.entity';
import { ComplaintsType } from '../../../common/enum';

@Entity({ name: 'complaints' })
export class Complaints extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ComplaintsType })
  type: ComplaintsType;

  @Column({ type: 'text' })
  description: string;

  @ManyToOne(() => CaseHistory, (caseHistory) => caseHistory.complaints, {
    cascade: true,
  })
  @JoinColumn({ name: 'case_history_id' })
  caseHistory: CaseHistory;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
