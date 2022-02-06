import { IsObject, IsOptional, IsString } from 'class-validator';

import { CaseHistory } from '../../case-history/entities';
import { Problems } from '../../problems/entities';
import { RelationshipTypes } from '../../../common/enum';

export class CreateMolarRelationshipProblemsDto {
  @IsString()
  relationshipType: RelationshipTypes;

  @IsObject()
  @IsOptional()
  problemOne: Problems;

  @IsObject()
  @IsOptional()
  problemTwo: Problems;

  @IsObject()
  caseHistory: CaseHistory;
}
