import mongoose, { Document, Schema } from 'mongoose';

export interface IActivity extends Document {
  title: string;
  description: string;
  type: 'Seminar' | 'Competition' | 'Youth Program' | 'Community' | 'Other';
  location: string;
  startDate: Date;
  endDate?: Date;
  startTime: string;
  maxParticipants: number;
  registered: number;
  requiresApproval: boolean;
  isActive: boolean;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['Seminar', 'Competition', 'Youth Program', 'Community', 'Other'],
      required: true
    },
    location: {
      type: String,
      required: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: Date,
    startTime: {
      type: String,
      required: true
    },
    maxParticipants: {
      type: Number,
      required: true,
      default: 50
    },
    registered: {
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
    imageUrl: String
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IActivity>('Activity', activitySchema);
