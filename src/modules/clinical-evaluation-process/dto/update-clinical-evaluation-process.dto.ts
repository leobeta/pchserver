import { IsNumber, IsString } from 'class-validator';

export class UpdateClinicalEvaluationProcessDto {
  @IsNumber()
  id: number;

  @IsString()
  clinicalEvaluationProcess: string;
}
