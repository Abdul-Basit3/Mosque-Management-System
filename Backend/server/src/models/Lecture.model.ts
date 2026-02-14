import mongoose, { Document, Schema } from 'mongoose';

export interface ILecture extends Document {
  title: string;
  description: string;
  speaker: string;
  topic: string;
  videoType: 'youtube' | 'vimeo' | 'upload';
  videoUrl: string;
  thumbnailUrl?: string;
  duration: string;
  views: number;
  isPublished: boolean;
  uploadDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const lectureSchema = new Schema<ILecture>(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    speaker: {
      type: String,
      required: true
    },
    topic: {
      type: String,
      required: true
    },
    videoType: {
      type: String,
      enum: ['youtube', 'vimeo', 'upload'],
      required: true
    },
    videoUrl: {
      type: String,
      required: true
    },
    thumbnailUrl: String,
    duration: {
      type: String,
      required: true
    },
    views: {
      type: Number,
      default: 0
    },
    isPublished: {
      type: Boolean,
      default: false
    },
    uploadDate: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<ILecture>('Lecture', lectureSchema);
