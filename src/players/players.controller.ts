import { UsePipes, ValidationPipe } from '@nestjs/common';
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
import { UpdatePlayerDTO } from './dtos/UpdatePlayer.dto';
import { Player } from './interfaces/Player.interface';
import { CustomPipeValidationDataPlayerPipe } from './pipes/customPipeValidationDataPlayer.pipe';
import { PlayersService } from './players.service';
@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}
  @Post()
  @UsePipes(ValidationPipe)
  async createPlayer(@Body() createPlayerDTO: CreatePlayerDTO) {
    await this.playersService.createPlayer(createPlayerDTO);
  }
  @Put(':email')
  async updatePlayer(
    @Param('email', CustomPipeValidationDataPlayerPipe) email: string,
    @Body() updatePlayerDTO: UpdatePlayerDTO,
  ) {
    await this.playersService.updatePlayer(email, updatePlayerDTO);
  }
  @Get()
  async getPlayers(): Promise<Player[]> {
    return this.playersService.getPlayers();
  }
  @Get(':email')
  async getOnePlayer(
    @Param('email', CustomPipeValidationDataPlayerPipe) email: string,
  ): Promise<Player> {
    return this.playersService.getOnePlayer(email);
  }

  @Delete(':email')
  async deletePlayer(
    @Param('email', CustomPipeValidationDataPlayerPipe) email: string,
  ): Promise<void> {
    return this.playersService.deletePlayer(email);
  }
}
