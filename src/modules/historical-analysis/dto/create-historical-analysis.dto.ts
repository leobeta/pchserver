import { IsObject, IsOptional, IsString } from 'class-validator';

import { CaseHistory } from '../../case-history/entities';

export class CreateHistoricalAnalysisDto {
  @IsString()
  @IsOptional()
  personalHistory: string;

  @IsString()
  @IsOptional()
  familyHistory: string;

  @IsString()
  @IsOptional()
  academicHistory: string;

  @IsString()
  @IsOptional()
  socioAfectiveHistory: string;

  @IsString()
  @IsOptional()
  sexualHistory: string;

  @IsString()
  @IsOptional()
  problemHistory: string;

  @IsObject()
  caseHistory: CaseHistory;
}
