import { IsNumber, IsObject, IsString } from 'class-validator';

import { CaseHistory } from 'src/modules/case-history/entities';

export class UpdateProblemsDto {
  @IsNumber()
  id: number;
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsObject()
  caseHistory: CaseHistory;
}
