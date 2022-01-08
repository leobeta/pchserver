import { Complaints } from '../../complaints/entities/complaints.entity';
import { Genre } from 'src/common/enum';

export class UpdateCaseHistoryDto {
  id: number;
  identification: string;
  dob: Date;
  genre: Genre;
  initialContact: string;
  reason: string;
  scolarshipLevel?: string;
  occupation?: string;
  origin?: string;
  religion?: string;
  complaints?: Complaints[];
}
