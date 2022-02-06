import { IsString } from 'class-validator';

export class CreateClinicalEvaluationProcessDto {
  @IsString()
  clinicalEvaluationProcess: string;
}
