import { IsDate, IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';

import { Complaints } from '../../complaints/entities';
import { Genre } from '../../../common/enum';
import { User } from '../../../modules/users/entities';

export class CreateCaseHistoryDto {
  @IsString()
  @IsNotEmpty()
  identification: string;

  @IsDate()
  @IsNotEmpty()
  dob: Date;

  @IsString()
  genre: Genre;

  @IsString()
  @IsNotEmpty()
  initialContact: string;

  @IsString()
  @IsNotEmpty()
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
