import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { CaseHistory } from '../../case-history/entities';
import { Problems } from '../../problems/entities';
import { RelationshipTypes } from '../../../common/enum';

@Entity('molar_relationship_problems')
export class MolarRelationshipProblems extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: RelationshipTypes })
  relationshipType: RelationshipTypes;

  @OneToOne(() => Problems)
  @JoinColumn()
  problemOne: Problems;

  @OneToOne(() => Problems)
  @JoinColumn()
  problemTwo: Problems;

  @ManyToOne(() => CaseHistory, (caseHistory) => caseHistory.molarRelationshipProblems, {
    cascade: true,
  })
  @JoinColumn({ name: 'case_history_id' })
  caseHistory: CaseHistory;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
