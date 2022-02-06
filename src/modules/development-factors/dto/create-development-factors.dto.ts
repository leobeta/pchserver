import { IsObject, IsString } from 'class-validator';

import { CaseHistory } from '../../case-history/entities';

export class CreateDevelopmentFactorsDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsObject()
  caseHistory: CaseHistory;
}
