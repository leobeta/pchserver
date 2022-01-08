import { ComplaintsType } from '../../../common/enum';

export class UpdateComplaintsDto {
  id: number;
  type: ComplaintsType;
  description: string;
}
