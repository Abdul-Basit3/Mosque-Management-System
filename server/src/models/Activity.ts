import mongoose, { Document, Schema } from 'mongoose';

export interface IActivity extends Document {
  title: string;
  description: string;
  type: 'seminar' | 'competition' | 'youth_program' | 'community' | 'other';
  location: string;
  startDate: Date;
  endDate?: Date;
  maxParticipants?: number;
  registeredCount: number;
  requiresApproval: boolean;
  isActive: boolean;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

const activitySchema = new Schema<IActivity>(
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
    type: {
      type: String,
      enum: ['seminar', 'competition', 'youth_program', 'community', 'other'],
      required: true
    },
    location: {
      type: String,
      required: true,
      maxlength: 255
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date
    },
    maxParticipants: {
      type: Number
    },
    registeredCount: {
      type: Number,
      default: 0
    },
    requiresApproval: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      default: true
    },
    image: {
      type: String,
      maxlength: 500
    }
  },
  {
    timestamps: true
  }
);

export const Activity = mongoose.model<IActivity>('Activity', activitySchema);
