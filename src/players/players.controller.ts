import { Controller, Body, Post, Get, Put, Param } from '@nestjs/common';

import { CreatePlayerDTO } from './dtos/CreatePlayer.dto';
import { Player } from './interfaces/Player.interface';
import { PlayersService } from './players.service';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}
  @Post()
  async createPlayer(@Body() createPlayerDTO: CreatePlayerDTO) {
    await this.playersService.createPlayer(createPlayerDTO);
  }
  @Put(':email')
  async updatePlayer(
    @Param('email') email: string,
    @Body() updatePlayerDTO: CreatePlayerDTO,
  ) {
    await this.playersService.updatePlayer(email, updatePlayerDTO);
  }
  @Get()
  async getPlayers(): Promise<Player[]> {
    return this.playersService.getPlayers();
  }
}
