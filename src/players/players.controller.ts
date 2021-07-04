import {
  Controller,
  Body,
  Post,
  Get,
  Put,
  Param,
  Delete,
} from '@nestjs/common';

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
  @Get(':email')
  async getOnePlayer(@Param('email') email: string): Promise<Player> {
    return this.playersService.getOnePlayer(email);
  }

  @Delete(':email')
  async deletePlayer(@Param('email') email: string): Promise<void> {
    return this.playersService.deletePlayer(email);
  }
}
