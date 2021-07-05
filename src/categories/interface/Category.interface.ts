import { Document } from 'mongoose';
import { Player } from 'src/players/interfaces/Player.interface';

export interface Category extends Document {
  readonly category: string;
  readonly description: string;
  events: Array<Event>;
  players: Array<Player>;
}

export interface Event {
  name: string;
  operation: string;
  valeu: number;
}
