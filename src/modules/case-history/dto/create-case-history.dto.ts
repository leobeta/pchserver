import { IsDate, IsObject, IsString } from 'class-validator';

import { Complaints } from '../../complaints/entities/complaints.entity';
import { Genre } from 'src/common/enum';
import { User } from 'src/modules/users/entities';

export class CreateCaseHistoryDto {
  @IsString()
  identification: string;
  @IsDate()
  dob: Date;
  genre: Genre;
  @IsString()
  initialContact: string;
  @IsString()
  reason: string;
  @IsString()
  scolarshipLevel?: string;
  @IsString()
  occupation?: string;
  @IsString()
  origin?: string;
  @IsString()
  religion?: string;
  complaints?: Complaints[];
  @IsObject()
  user: Partial<User>;
}
