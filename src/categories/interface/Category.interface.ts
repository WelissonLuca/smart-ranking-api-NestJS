import { Document } from 'mongoose';
import { Player } from 'src/players/interfaces/Player.interface';

export interface Category extends Document {
  readonly category: string;
  readonly description: string;
  events: Array<Events>;
  players: Array<Player>;
}

export interface Events {
  name: string;
  operation: string;
  valeu: number;
}
