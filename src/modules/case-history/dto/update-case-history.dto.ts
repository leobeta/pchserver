import { IsDate, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

import { Complaints } from '../../complaints/entities/complaints.entity';
import { Genre } from 'src/common/enum';
import { User } from 'src/modules/users/entities';

export class UpdateCaseHistoryDto {
  @IsNumber()
  id: number;
  @IsString()
  identification: string;
  @IsDate()
  dob: Date;
  @IsString()
  genre: Genre;
  @IsString()
  initialContact: string;
  @IsString()
  reason: string;
  @IsString()
  @IsOptional()
  scolarshipLevel: string;
  @IsString()
  @IsOptional()
  occupation: string;
  @IsString()
  @IsOptional()
  origin: string;
  @IsString()
  @IsOptional()
  religion: string;
  @IsObject()
  @IsOptional()
  complaints: Complaints[];
  @IsObject()
  user: Partial<User>;
}
