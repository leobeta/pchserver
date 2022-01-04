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

import { Complaints } from '../../complaints/entities/complaints.entity';
import { User } from 'src/modules/users/entities';

export enum Genre {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

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

  @ManyToOne(() => User, (user) => user.caseHistory, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
