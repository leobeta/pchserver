import { IsString } from 'class-validator';

export class CreateFunctionalAnalysisDto {
  @IsString()
  situation: string;

  @IsString()
  answer: string;

  @IsString()
  consequence: string;
}
