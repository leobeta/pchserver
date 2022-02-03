import { IsObject, IsString } from 'class-validator';

import { CaseHistory } from 'src/modules/case-history/entities';

export class CreateProblemsDto {
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsObject()
  caseHistory: CaseHistory;
}