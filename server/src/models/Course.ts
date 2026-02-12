import mongoose, { Document, Schema } from 'mongoose';

export interface ICourse extends Document {
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  thumbnail?: string;
  syllabus?: string;
  maxStudents?: number;
  enrollmentCount: number;
  isActive: boolean;
  startDate?: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const courseSchema = new Schema<ICourse>(
  {
    title: {
      type: String,
      required: true,
      maxlength: 255
    },
    description: {
      type: String,
      required: true
    },
    instructor: {
      type: String,
      required: true,
      maxlength: 255
    },
    duration: {
      type: String,
      required: true,
      maxlength: 100
    },
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true
    },
    thumbnail: {
      type: String,
      maxlength: 500
    },
    syllabus: {
      type: String
    },
    maxStudents: {
      type: Number
    },
    enrollmentCount: {
      type: Number,
      default: 0
    },
    isActive: {
      type: Boolean,
      default: true
    },
    startDate: {
      type: Date
    },
    endDate: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

export const Course = mongoose.model<ICourse>('Course', courseSchema);
