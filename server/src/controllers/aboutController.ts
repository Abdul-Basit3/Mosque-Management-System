import { Request, Response, NextFunction } from 'express';
import { About } from '../models/About';
import { AppError } from '../middleware/errorHandler';

export const getAboutInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const about = await About.findOne();

    if (!about) {
      throw new AppError('About information not found', 404);
    }

    res.json({
      success: true,
      data: about
    });
  } catch (error) {
    next(error);
  }
};

export const updateAboutInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let about = await About.findOne();

    if (!about) {
      about = await About.create(req.body);
    } else {
      Object.assign(about, req.body);
      await about.save();
    }

    res.json({
      success: true,
      data: about
    });
  } catch (error) {
    next(error);
  }
};
