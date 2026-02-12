import mongoose, { Document, Schema } from 'mongoose';

export interface IContent extends Document {
  type: 'dua' | 'verse' | 'hadith';
  title: string;
  arabicText: string;
  transliteration?: string;
  translation: string;
  reference?: string;
  isActive: boolean;
  displayOrder?: number;
  createdAt: Date;
  updatedAt: Date;
}

const contentSchema = new Schema<IContent>(
  {
    type: {
      type: String,
      enum: ['dua', 'verse', 'hadith'],
      required: true
    },
    title: {
      type: String,
      required: true,
      maxlength: 255
    },
    arabicText: {
      type: String,
      required: true
    },
    transliteration: {
      type: String
    },
    translation: {
      type: String,
      required: true
    },
    reference: {
      type: String,
      maxlength: 255
    },
    isActive: {
      type: Boolean,
      default: true
    },
    displayOrder: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

export const Content = mongoose.model<IContent>('Content', contentSchema);
