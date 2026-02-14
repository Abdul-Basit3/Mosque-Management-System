import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  category: 'Building' | 'Charity' | 'Education' | 'Community';
  status: 'Planning' | 'Ongoing' | 'Completed' | 'Paused';
  fundingGoal: number;
  fundingRaised: number;
  startDate: Date;
  endDate?: Date;
  imageUrl?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    category: {
      type: String,
      enum: ['Building', 'Charity', 'Education', 'Community'],
      required: true
    },
    status: {
      type: String,
      enum: ['Planning', 'Ongoing', 'Completed', 'Paused'],
      required: true
    },
    fundingGoal: {
      type: Number,
      required: true
    },
    fundingRaised: {
      type: Number,
      default: 0
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: Date,
    imageUrl: String,
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IProject>('Project', projectSchema);
