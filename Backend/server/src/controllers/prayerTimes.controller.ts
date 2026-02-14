import { Request, Response } from 'express';
import PrayerTime from '../models/PrayerTime.model';

// Helper function to format time to 12-hour format with AM/PM
const formatTimeTo12Hour = (time: string): string => {
  if (!time) return time;
  
  // If already has AM/PM, return as is
  if (time.includes('AM') || time.includes('PM')) {
    return time;
  }
  
  // Parse 24-hour format (HH:mm)
  const [hours, minutes] = time.split(':').map(Number);
  
  if (isNaN(hours) || isNaN(minutes)) {
    return time; // Return original if invalid
  }
  
  const period = hours >= 12 ? 'PM' : 'AM';
  const hour12 = hours % 12 || 12; // Convert 0 to 12
  
  return `${hour12.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
};

// Helper function to format prayer times object
const formatPrayerTimes = (prayerTime: any) => {
  return {
    fajr: formatTimeTo12Hour(prayerTime.fajr),
    sunrise: formatTimeTo12Hour(prayerTime.sunrise),
    dhuhr: formatTimeTo12Hour(prayerTime.dhuhr),
    asr: formatTimeTo12Hour(prayerTime.asr),
    maghrib: formatTimeTo12Hour(prayerTime.maghrib),
    isha: formatTimeTo12Hour(prayerTime.isha),
    location: prayerTime.location,
    date: prayerTime.date
  };
};

export const getTodayPrayerTimes = async (req: Request, res: Response) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let prayerTime = await PrayerTime.findOne({ date: today });

    // If no prayer times for today, create default ones
    if (!prayerTime) {
      prayerTime = await PrayerTime.create({
        date: today,
        fajr: '04:45',
        sunrise: '05:55',
        dhuhr: '12:05',
        asr: '15:25',
        maghrib: '18:15',
        isha: '19:25',
        location: 'Accra, Ghana'
      });
    }

    res.json({
      success: true,
      data: formatPrayerTimes(prayerTime)
    });
  } catch (error) {
    console.error('Get prayer times error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching prayer times'
    });
  }
};

export const getPrayerTimesByDate = async (req: Request, res: Response) => {
  try {
    const { date } = req.params;
    const queryDate = new Date(date);
    queryDate.setHours(0, 0, 0, 0);

    const prayerTime = await PrayerTime.findOne({ date: queryDate });

    if (!prayerTime) {
      return res.status(404).json({
        success: false,
        message: 'Prayer times not found for this date'
      });
    }

    res.json({
      success: true,
      data: formatPrayerTimes(prayerTime)
    });
  } catch (error) {
    console.error('Get prayer times by date error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching prayer times'
    });
  }
};

export const updatePrayerTimes = async (req: Request, res: Response) => {
  try {
    const { date, fajr, sunrise, dhuhr, asr, maghrib, isha, location } = req.body;

    if (!date) {
      return res.status(400).json({
        success: false,
        message: 'Date is required'
      });
    }

    const queryDate = new Date(date);
    queryDate.setHours(0, 0, 0, 0);

    const updateData: any = {};
    if (fajr) updateData.fajr = fajr;
    if (sunrise) updateData.sunrise = sunrise;
    if (dhuhr) updateData.dhuhr = dhuhr;
    if (asr) updateData.asr = asr;
    if (maghrib) updateData.maghrib = maghrib;
    if (isha) updateData.isha = isha;
    if (location) updateData.location = location;

    const prayerTime = await PrayerTime.findOneAndUpdate(
      { date: queryDate },
      updateData,
      { new: true, upsert: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Prayer times updated successfully',
      data: formatPrayerTimes(prayerTime)
    });
  } catch (error) {
    console.error('Update prayer times error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating prayer times'
    });
  }
};

export const bulkCreatePrayerTimes = async (req: Request, res: Response) => {
  try {
    const { prayerTimes } = req.body;

    if (!Array.isArray(prayerTimes) || prayerTimes.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Prayer times array is required'
      });
    }

    const results = [];
    for (const pt of prayerTimes) {
      const queryDate = new Date(pt.date);
      queryDate.setHours(0, 0, 0, 0);

      const prayerTime = await PrayerTime.findOneAndUpdate(
        { date: queryDate },
        {
          fajr: pt.fajr,
          sunrise: pt.sunrise,
          dhuhr: pt.dhuhr,
          asr: pt.asr,
          maghrib: pt.maghrib,
          isha: pt.isha,
          location: pt.location || 'Accra, Ghana'
        },
        { new: true, upsert: true, runValidators: true }
      );

      results.push(prayerTime);
    }

    res.json({
      success: true,
      message: `${results.length} prayer times created/updated successfully`,
      data: results.map(formatPrayerTimes)
    });
  } catch (error) {
    console.error('Bulk create prayer times error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating prayer times'
    });
  }
};

export const deletePrayerTimes = async (req: Request, res: Response) => {
  try {
    const { date } = req.params;
    const queryDate = new Date(date);
    queryDate.setHours(0, 0, 0, 0);

    const result = await PrayerTime.findOneAndDelete({ date: queryDate });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Prayer times not found for this date'
      });
    }

    res.json({
      success: true,
      message: 'Prayer times deleted successfully'
    });
  } catch (error) {
    console.error('Delete prayer times error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting prayer times'
    });
  }
};
