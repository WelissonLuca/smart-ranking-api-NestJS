import { Injectable, Logger } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/CreatePlayer.dto';
import { Player } from './interfaces/Player.interface';
import { v4 as uuid } from 'uuid';
@Injectable()
export class PlayersService {
  private players: Player[] = [];
  private readonly logger = new Logger(PlayersService.name);
  async createPlayer(createPlayerDTO: CreatePlayerDTO): Promise<void> {
    this.create(createPlayerDTO);
  }

  private create(createPlayerDTO: CreatePlayerDTO): void {
    const { name, phone, email } = createPlayerDTO;

    const player: Player = {
      id: uuid(),
      name,
      phone,
      email,
      ranking: 'A',
      positionRanking: 1,
      urlPlayerPhoto: 'www.teste/123.jpg',
    };
    this.logger.log(`createPlayerDTO: ${JSON.stringify(player)}`);

    this.players.push(player);
  }
}
