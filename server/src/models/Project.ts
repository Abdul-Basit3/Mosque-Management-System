import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  category: 'building' | 'charity' | 'education' | 'community' | 'other';
  status: 'planning' | 'ongoing' | 'completed' | 'paused';
  fundingGoal?: number;
  fundingRaised: number;
  startDate?: Date;
  endDate?: Date;
  images?: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>(
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
    category: {
      type: String,
      enum: ['building', 'charity', 'education', 'community', 'other'],
      required: true
    },
    status: {
      type: String,
      enum: ['planning', 'ongoing', 'completed', 'paused'],
      required: true
    },
    fundingGoal: {
      type: Number
    },
    fundingRaised: {
      type: Number,
      default: 0
    },
    startDate: {
      type: Date
    },
    endDate: {
      type: Date
    },
    images: [{
      type: String
    }],
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

export const Project = mongoose.model<IProject>('Project', projectSchema);
