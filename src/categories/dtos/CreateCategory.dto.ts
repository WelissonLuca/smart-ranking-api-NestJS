import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Events } from '../interface/Category.interface';
export class CreateCategoryDTO {
  @IsString()
  @IsNotEmpty()
  readonly category: string;

  @IsString()
  @IsNotEmpty()
  descritpion: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsNotEmpty()
  events: Array<Events>;
}
