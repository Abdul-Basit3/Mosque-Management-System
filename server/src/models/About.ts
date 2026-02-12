import mongoose, { Document, Schema } from 'mongoose';

export interface IAbout extends Document {
  organizationName: string;
  history?: string;
  mission?: string;
  vision?: string;
  values?: string;
  address?: string;
  phone?: string;
  email?: string;
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
      required: true,
      maxlength: 255
    },
    history: {
      type: String
    },
    mission: {
      type: String
    },
    vision: {
      type: String
    },
    values: {
      type: String
    },
    address: {
      type: String
    },
    phone: {
      type: String,
      maxlength: 20
    },
    email: {
      type: String,
      maxlength: 255
    },
    facebookUrl: {
      type: String,
      maxlength: 500
    },
    twitterUrl: {
      type: String,
      maxlength: 500
    },
    instagramUrl: {
      type: String,
      maxlength: 500
    },
    youtubeUrl: {
      type: String,
      maxlength: 500
    },
    tiktokUrl: {
      type: String,
      maxlength: 500
    }
  },
  {
    timestamps: true
  }
);

export const About = mongoose.model<IAbout>('About', aboutSchema);
