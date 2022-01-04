import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CaseHistory } from '../../case-history/entities/case-history.entity';

export enum Type {
  COGNITIVE_ASPECT = 'ASPECTO_COGNITIVO',
  AFFECTIVE_ASPECT = 'ASPECTO_AFECTIVO',
  BEHAVORIAL_ASPECT = 'ASPECTO_CONDUCTUAL',
  PHYSIOLOGICAL_ASPECT = 'ASPECTO_FISIOLOGICO',
  RELATIONAL_ASPECT = 'ASPECTO_RELACIONAL',
  CONTEXTUAL_ASPECT = 'ASPECTO_CONTEXTUAL',
}

@Entity({ name: 'complaints' })
export class Complaints extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: Type })
  type: Type;

  @Column({ type: 'text' })
  description: string;

  @ManyToOne(() => CaseHistory, (caseHistory) => caseHistory.complaints, {
    cascade: true,
  })
  @JoinColumn({ name: 'case_history_id' })
  caseHistory: CaseHistory;
}
