import mongoose, { Document, Schema } from 'mongoose';

export interface ILecture extends Document {
  title: string;
  description: string;
  speaker: string;
  topic: string;
  videoType: 'upload' | 'youtube' | 'vimeo';
  videoUrl: string;
  thumbnail?: string;
  duration?: number;
  views: number;
  isPublished: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const lectureSchema = new Schema<ILecture>(
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
    speaker: {
      type: String,
      required: true,
      maxlength: 255
    },
    topic: {
      type: String,
      required: true,
      maxlength: 255
    },
    videoType: {
      type: String,
      enum: ['upload', 'youtube', 'vimeo'],
      required: true
    },
    videoUrl: {
      type: String,
      required: true,
      maxlength: 500
    },
    thumbnail: {
      type: String,
      maxlength: 500
    },
    duration: {
      type: Number
    },
    views: {
      type: Number,
      default: 0
    },
    isPublished: {
      type: Boolean,
      default: false
    },
    publishedAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

export const Lecture = mongoose.model<ILecture>('Lecture', lectureSchema);
