import { IsNumber, IsObject, IsString } from 'class-validator';

import { CaseHistory } from '../../case-history/entities';

export class UpdateDevelopmentFactorsDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsObject()
  caseHistory: CaseHistory;
}
