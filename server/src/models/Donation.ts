import mongoose, { Document, Schema } from 'mongoose';

export interface IDonation extends Document {
  userId?: mongoose.Types.ObjectId;
  projectId?: mongoose.Types.ObjectId;
  amount: number;
  donorName?: string;
  donorEmail?: string;
  message?: string;
  paymentMethod: 'card' | 'bank' | 'cash' | 'other';
  transactionId?: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  isAnonymous: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const donationSchema = new Schema<IDonation>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'Project'
    },
    amount: {
      type: Number,
      required: true
    },
    donorName: {
      type: String,
      maxlength: 255
    },
    donorEmail: {
      type: String,
      maxlength: 255
    },
    message: {
      type: String
    },
    paymentMethod: {
      type: String,
      enum: ['card', 'bank', 'cash', 'other'],
      required: true
    },
    transactionId: {
      type: String,
      maxlength: 255
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending'
    },
    isAnonymous: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

export const Donation = mongoose.model<IDonation>('Donation', donationSchema);
