import { IsNumber, IsString } from 'class-validator';

export class UpdateFunctionalAnalysisDto {
  @IsNumber()
  id: number;

  @IsString()
  situation: string;

  @IsString()
  answer: string;

  @IsString()
  consequence: string;
}
