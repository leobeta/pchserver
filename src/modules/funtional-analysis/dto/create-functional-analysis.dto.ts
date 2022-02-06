import { IsObject, IsOptional, IsString } from 'class-validator';

import { CaseHistory } from '../../case-history/entities';

export class CreateFunctionalAnalysisDto {
  @IsString()
  @IsOptional()
  situation: string;

  @IsString()
  @IsOptional()
  answer: string;

  @IsString()
  @IsOptional()
  consequence: string;

  @IsObject()
  caseHistory: CaseHistory;
}
