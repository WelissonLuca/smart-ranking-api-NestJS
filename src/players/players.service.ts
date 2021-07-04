import { Injectable, Logger } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/CreatePlayer.dto';
import { Player } from './interfaces/Player.interface';
import { v4 as uuid } from 'uuid';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel('players') private readonly playerModel: Model<Player>,
  ) {}

  private readonly logger = new Logger(PlayersService.name);

  async createPlayer(createPlayerDTO: CreatePlayerDTO): Promise<void> {
    this.create(createPlayerDTO);
  }
  async updatePlayer(
    email: string,
    createPlayerDTO: CreatePlayerDTO,
  ): Promise<void> {
    const playerAlreadyExists = await this.playerModel
      .findOne({ email })
      .exec();

    if (!playerAlreadyExists) throw new Error('Player not found');

    this.update(email, createPlayerDTO);
  }

  async getPlayers(): Promise<Player[]> {
    return await this.playerModel.find().exec();
  }

  async getOnePlayer(email: string): Promise<Player> {
    const player = await this.playerModel.findOne({ email }).exec();
    if (!player) throw new Error('Player not found');
    return await player;
  }

  async deletePlayer(email: string): Promise<void> {
    const player = await this.playerModel.findOne({ email }).exec();
    if (!player) throw new Error('Player not found');

    player.remove();
  }
  private async create(createPlayerDTO: CreatePlayerDTO): Promise<Player> {
    const result = new this.playerModel(createPlayerDTO);

    return await result.save();
  }

  private async update(
    email: string,
    createPlayerDTO: CreatePlayerDTO,
  ): Promise<Player> {
    const player = await this.playerModel.findOne({ email }).exec();
    if (!player) throw new Error('Player not found');

    return player.update(createPlayerDTO);
  }
}
