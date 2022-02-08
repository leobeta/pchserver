import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, MaxLength } from 'class-validator';

import { CaseHistory } from '../../case-history/entities';

export class UpdateClinicalFormulationDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(2000)
  description: string;

  @IsObject()
  @IsNotEmpty()
  caseHistory: CaseHistory;
}
