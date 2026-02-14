import mongoose, { Document, Schema } from 'mongoose';

export interface IAbout extends Document {
  organizationName: string;
  history: string;
  mission: string;
  vision: string;
  values: string[];
  address: string;
  phone: string;
  email: string;
  facebookUrl?: string;
  twitterUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  tiktokUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const aboutSchema = new Schema<IAbout>(
  {
    organizationName: {
      type: String,
      required: true
    },
    history: {
      type: String,
      required: true
    },
    mission: {
      type: String,
      required: true
    },
    vision: {
      type: String,
      required: true
    },
    values: {
      type: [String],
      default: []
    },
    address: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    facebookUrl: String,
    twitterUrl: String,
    instagramUrl: String,
    youtubeUrl: String,
    tiktokUrl: String
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IAbout>('About', aboutSchema);
