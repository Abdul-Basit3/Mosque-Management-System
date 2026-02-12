import mongoose, { Document, Schema } from 'mongoose';

export interface IEnrollment extends Document {
  userId: mongoose.Types.ObjectId;
  courseId: mongoose.Types.ObjectId;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  progress: number;
  enrolledAt: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const enrollmentSchema = new Schema<IEnrollment>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'completed'],
      default: 'pending'
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    enrolledAt: {
      type: Date,
      default: Date.now
    },
    completedAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

export const Enrollment = mongoose.model<IEnrollment>('Enrollment', enrollmentSchema);
