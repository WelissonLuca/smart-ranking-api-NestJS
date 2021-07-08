import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/CreatePlayer.dto';
import { Player } from './interfaces/Player.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UpdatePlayerDTO } from './dtos/UpdatePlayer.dto';
UpdatePlayerDTO;
@Injectable()
export class PlayersService {
  constructor(
    @InjectModel('players') private readonly playerModel: Model<Player>,
  ) {}

  private readonly logger = new Logger(PlayersService.name);

  async createPlayer(createPlayerDTO: CreatePlayerDTO): Promise<Player> {
    await this.checkIfPlayerExists(createPlayerDTO.email);
    return await this.create(createPlayerDTO);
  }
  async updatePlayer(
    email: string,
    updatePlayerDTO: UpdatePlayerDTO,
  ): Promise<void> {
    await this.update(email, updatePlayerDTO);
  }

  async getPlayers(): Promise<Player[]> {
    return await this.playerModel.find().exec();
  }

  async getOnePlayer(email: string): Promise<Player> {
    await this.checkIfPlayerDoesNotExist(email);
    return await this.playerModel.findOne({ email }).exec();
  }

  async deletePlayer(email: string): Promise<void> {
    await this.checkIfPlayerDoesNotExist(email);
    await this.playerModel.deleteOne({ email }).exec();
  }
  private async create(createPlayerDTO: CreatePlayerDTO): Promise<Player> {
    const result = new this.playerModel(createPlayerDTO);

    await result.save();
    return result;
  }

  private async update(
    email: string,
    updatePlayerDTO: UpdatePlayerDTO,
  ): Promise<void> {
    await this.checkIfPlayerDoesNotExist(email);

    await this.playerModel
      .updateOne({ email }, { $set: updatePlayerDTO })
      .exec();
  }
  private async checkIfPlayerDoesNotExist(email: string): Promise<Player> {
    const result = await this.playerModel.findOne({ email }).exec();
    if (!result) throw new NotFoundException('Player not found');
    return result;
  }
  private async checkIfPlayerExists(email: string): Promise<Player> {
    const result = await this.playerModel.findOne({ email }).exec();
    if (result) throw new BadRequestException('Player already exists');
    return result;
  }
}
