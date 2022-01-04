import { Complaints } from '../../complaints/entities/complaints.entity';

export class CaseHistoryDto {
  id: number;
  identification: string;
  dob: Date;
  genre: string;
  scolarshipLevel?: string;
  occupation?: string;
  origin?: string;
  religion?: string;
  initialContact: string;
  reason: string;
  complaints?: Complaints[];
}
