import { ArrayMinSize, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDTO {
  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @ArrayMinSize(1)
  events: Array<Event>;
}
