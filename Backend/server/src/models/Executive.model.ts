import mongoose, { Document, Schema } from 'mongoose';

export interface IExecutive extends Document {
  firstName: string;
  lastName: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  bio: string;
  imageUrl?: string;
  isActive: boolean;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const executiveSchema = new Schema<IExecutive>(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
    },
    department: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    bio: {
      type: String,
      required: true
    },
    imageUrl: String,
    isActive: {
      type: Boolean,
      default: true
    },
    displayOrder: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IExecutive>('Executive', executiveSchema);
