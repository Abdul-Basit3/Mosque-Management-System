import mongoose, { Document, Schema } from 'mongoose';

export interface IRegistration extends Document {
  userId: mongoose.Types.ObjectId;
  activityId: mongoose.Types.ObjectId;
  status: 'pending' | 'approved' | 'rejected' | 'attended' | 'cancelled';
  notes?: string;
  registeredAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const registrationSchema = new Schema<IRegistration>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    activityId: {
      type: Schema.Types.ObjectId,
      ref: 'Activity',
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'attended', 'cancelled'],
      default: 'pending'
    },
    notes: {
      type: String
    },
    registeredAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

export const Registration = mongoose.model<IRegistration>('Registration', registrationSchema);
