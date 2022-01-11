import { IsObject, IsString } from 'class-validator';

import { CaseHistory } from 'src/modules/case-history/entities';
import { ComplaintsType } from '../../../common/enum';

export class CreateComplaintsDto {
  @IsString()
  type: ComplaintsType;
  @IsString()
  description: string;
  @IsObject()
  caseHistory: CaseHistory;
}
