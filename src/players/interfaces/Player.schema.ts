import * as mongoose from 'mongoose';

export const PlayerSchema = new mongoose.Schema(
  {
    phone: String,
    email: {
      type: String,
      unique: true,
    },
    name: String,
    ranking: String,
    positionRanking: String,
    urlPlayerPhoto: String,
  },
  { timestamps: true, collection: 'players' },
);
