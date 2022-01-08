import { ComplaintsType } from '../../../common/enum';

export class CreateComplaintsDto {
  type: ComplaintsType;
  description: string;
}
