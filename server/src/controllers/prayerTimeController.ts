import { Request, Response, NextFunction } from 'express';
import { PrayerTime } from '../models/PrayerTime';
import { AppError } from '../middleware/errorHandler';
import { Op } from 'sequelize';

export const getTodayPrayerTimes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const prayerTime = await PrayerTime.findOne({ where: { date: today } });

    if (!prayerTime) {
      throw new AppError('Prayer times not found for today', 404);
    }

    res.json({
      success: true,
      data: prayerTime
    });
  } catch (error) {
    next(error);
  }
};

export const getPrayerTimesByDateRange = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { startDate, endDate } = req.query;

    const prayerTimes = await PrayerTime.findAll({
      where: {
        date: {
          [Op.between]: [startDate as string, endDate as string]
        }
      },
      order: [['date', 'ASC']]
    });

    res.json({
      success: true,
      data: prayerTimes
    });
  } catch (error) {
    next(error);
  }
};

export const createPrayerTime = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const prayerTime = await PrayerTime.create(req.body);

    res.status(201).json({
      success: true,
      data: prayerTime
    });
  } catch (error) {
    next(error);
  }
};

export const updatePrayerTime = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const prayerTime = await PrayerTime.findByPk(id);

    if (!prayerTime) {
      throw new AppError('Prayer time not found', 404);
    }

    await prayerTime.update(req.body);

    res.json({
      success: true,
      data: prayerTime
    });
  } catch (error) {
    next(error);
  }
};
