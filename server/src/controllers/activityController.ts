import { Request, Response, NextFunction } from 'express';
import { Activity } from '../models/Activity';
import { Registration } from '../models/Registration';
import { AppError } from '../middleware/errorHandler';

export const getAllActivities = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { type, upcoming } = req.query;
    const filter: any = { isActive: true };

    if (type) filter.type = type;
    if (upcoming === 'true') {
      filter.startDate = { $gte: new Date() };
    }

    const activities = await Activity.find(filter)
      .sort({ startDate: 1 });

    res.json({
      success: true,
      data: activities
    });
  } catch (error) {
    next(error);
  }
};

export const getActivityById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findById(id);

    if (!activity) {
      throw new AppError('Activity not found', 404);
    }

    res.json({
      success: true,
      data: activity
    });
  } catch (error) {
    next(error);
  }
};

export const createActivity = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const activity = await Activity.create(req.body);

    res.status(201).json({
      success: true,
      data: activity
    });
  } catch (error) {
    next(error);
  }
};

export const registerForActivity = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { activityId } = req.params;
    const userId = req.user.id;
    const { notes } = req.body;

    const activity = await Activity.findById(activityId);
    if (!activity) {
      throw new AppError('Activity not found', 404);
    }

    if (activity.maxParticipants && activity.registeredCount >= activity.maxParticipants) {
      throw new AppError('Activity is full', 400);
    }

    const existingRegistration = await Registration.findOne({
      userId, activityId
    });

    if (existingRegistration) {
      throw new AppError('Already registered for this activity', 400);
    }

    const registration = await Registration.create({
      userId,
      activityId: Number(activityId),
      notes,
      registeredAt: new Date(),
      status: activity.requiresApproval ? 'pending' : 'approved'
    });

    activity.registeredCount += 1;
    await activity.save();

    res.status(201).json({
      success: true,
      data: registration
    });
  } catch (error) {
    next(error);
  }
};

export const updateRegistrationStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const registration = await Registration.findById(id);
    if (!registration) {
      throw new AppError('Registration not found', 404);
    }

    registration.status = status;
    await registration.save();

    res.json({
      success: true,
      data: registration
    });
  } catch (error) {
    next(error);
  }
};
