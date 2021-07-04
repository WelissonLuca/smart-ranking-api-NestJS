import { IsEmail, IsNotEmpty } from 'class-validator';
export class CreatePlayerDTO {
  @IsNotEmpty()
  readonly phone: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  readonly name: string;
}
