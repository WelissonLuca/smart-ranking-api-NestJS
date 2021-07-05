import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { isEmail } from 'class-validator';

export class CustomPipeValidationDataPlayerPipe implements PipeTransform {
  transform(input: any, metadata: ArgumentMetadata): any {
    const email = isEmail(input);
    console.log(email);
    if (!email) throw new BadRequestException('Invalid email');
    return input;
  }
}
