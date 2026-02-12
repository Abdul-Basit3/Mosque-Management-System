import mongoose, { Document, Schema } from 'mongoose';

export interface IFAQ extends Document {
  category: string;
  question: string;
  answer: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const faqSchema = new Schema<IFAQ>(
  {
    category: {
      type: String,
      required: true,
      maxlength: 100
    },
    question: {
      type: String,
      required: true
    },
    answer: {
      type: String,
      required: true
    },
    displayOrder: {
      type: Number,
      default: 0
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

export const FAQ = mongoose.model<IFAQ>('FAQ', faqSchema);
