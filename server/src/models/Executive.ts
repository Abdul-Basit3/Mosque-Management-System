import mongoose, { Document, Schema } from 'mongoose';

export interface IExecutive extends Document {
  firstName: string;
  lastName: string;
  role: string;
  department?: string;
  bio?: string;
  photo?: string;
  email?: string;
  phone?: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const executiveSchema = new Schema<IExecutive>(
  {
    firstName: {
      type: String,
      required: true,
      maxlength: 100
    },
    lastName: {
      type: String,
      required: true,
      maxlength: 100
    },
    role: {
      type: String,
      required: true,
      maxlength: 255
    },
    department: {
      type: String,
      maxlength: 255
    },
    bio: {
      type: String
    },
    photo: {
      type: String,
      maxlength: 500
    },
    email: {
      type: String,
      maxlength: 255
    },
    phone: {
      type: String,
      maxlength: 20
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

export const Executive = mongoose.model<IExecutive>('Executive', executiveSchema);
