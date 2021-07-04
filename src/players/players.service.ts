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
  async updatePlayer(
    email: string,
    createPlayerDTO: CreatePlayerDTO,
  ): Promise<void> {
    const playerAlreadyExists = await this.players.find(
      (player) => player.email === email,
    );

    if (!playerAlreadyExists) throw new Error('Player not found');

    this.update(playerAlreadyExists, createPlayerDTO);
  }

  async getPlayers(): Promise<Player[]> {
    return this.players;
  }

  async getOnePlayer(email: string): Promise<Player> {
    const player = await this.players.find((player) => player.email === email);
    if (!player) throw new Error('Player not found');
    return player;
  }

  async deletePlayer(email: string): Promise<void> {
    const player = await this.players.find((player) => player.email === email);
    if (!player) throw new Error('Player not found');

    this.players = this.players.filter((p) => p.email !== player.email);
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

  private update(player: Player, createPlayerDTO: CreatePlayerDTO): void {
    const { name } = createPlayerDTO;

    player.name = name;
  }
}
