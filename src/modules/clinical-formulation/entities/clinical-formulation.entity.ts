import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { CaseHistory } from 'src/modules/case-history/entities';

@Entity('clinical_formulation')
export class ClinicalFormulation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToOne(() => CaseHistory, (caseHistory) => caseHistory.clinicalFormulation)
  caseHistory: CaseHistory;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
