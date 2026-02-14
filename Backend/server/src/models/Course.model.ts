import mongoose, { Document, Schema } from 'mongoose';

export interface ICourse extends Document {
  title: string;
  description: string;
  instructor: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  enrolled: number;
  maxStudents: number;
  startDate: Date;
  endDate?: Date;
  schedule: string;
  isActive: boolean;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const courseSchema = new Schema<ICourse>(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    instructor: {
      type: String,
      required: true
    },
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      required: true
    },
    duration: {
      type: String,
      required: true
    },
    enrolled: {
      type: Number,
      default: 0
    },
    maxStudents: {
      type: Number,
      required: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: Date,
    schedule: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      default: true
    },
    imageUrl: String
  },
  {
    timestamps: true
  }
);

export default mongoose.model<ICourse>('Course', courseSchema);
