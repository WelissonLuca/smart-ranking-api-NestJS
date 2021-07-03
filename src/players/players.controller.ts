import { Body, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/CreatePlayer.dto';
import { PlayersService } from './players.service';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}
  @Post()
  async createPlayer(@Body() createPlayerDTO: CreatePlayerDTO) {
    await this.playersService.createPlayer(createPlayerDTO);
  }
}
