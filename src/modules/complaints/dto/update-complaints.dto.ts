import { IsNumber, IsObject, IsString } from 'class-validator';

import { CaseHistory } from 'src/modules/case-history/entities';
import { ComplaintsType } from '../../../common/enum';

export class UpdateComplaintsDto {
  @IsNumber()
  id: number;
  @IsString()
  type: ComplaintsType;
  @IsString()
  description: string;
  @IsObject()
  caseHistory: CaseHistory;
}
