import mongoose, { Document, Schema } from 'mongoose';

export interface IPrayerTime extends Document {
  date: Date;
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  location: string;
  latitude?: number;
  longitude?: number;
  createdAt: Date;
  updatedAt: Date;
}

const prayerTimeSchema = new Schema<IPrayerTime>(
  {
    date: {
      type: Date,
      required: true,
      unique: true
    },
    fajr: {
      type: String,
      required: true
    },
    sunrise: {
      type: String,
      required: true
    },
    dhuhr: {
      type: String,
      required: true
    },
    asr: {
      type: String,
      required: true
    },
    maghrib: {
      type: String,
      required: true
    },
    isha: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true,
      default: 'Accra, Ghana'
    },
    latitude: {
      type: Number
    },
    longitude: {
      type: Number
    }
  },
  {
    timestamps: true
  }
);

// Index for efficient date queries
prayerTimeSchema.index({ date: 1 });

export default mongoose.model<IPrayerTime>('PrayerTime', prayerTimeSchema);
