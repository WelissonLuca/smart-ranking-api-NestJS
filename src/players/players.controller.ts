import { Body, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/CreatePlayer.dto';

@Controller('api/v1/players')
export class PlayersController {
  @Post()
  async handle(@Body() createPlayerDTO: CreatePlayerDTO) {
    const { email } = createPlayerDTO;
    return JSON.stringify({
      name: email,
    });
  }
}
