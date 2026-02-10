import { Request, Response, NextFunction } from 'express';
import { Activity } from '../models/Activity';
import { Registration } from '../models/Registration';
import { AppError } from '../middleware/errorHandler';
import { Op } from 'sequelize';

export const getAllActivities = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { type, upcoming } = req.query;
    const where: any = { isActive: true };

    if (type) where.type = type;
    if (upcoming === 'true') {
      where.startDate = { [Op.gte]: new Date() };
    }

    const activities = await Activity.findAll({
      where,
      order: [['startDate', 'ASC']]
    });

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
    const activity = await Activity.findByPk(id);

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

    const activity = await Activity.findByPk(activityId);
    if (!activity) {
      throw new AppError('Activity not found', 404);
    }

    if (activity.maxParticipants && activity.registeredCount >= activity.maxParticipants) {
      throw new AppError('Activity is full', 400);
    }

    const existingRegistration = await Registration.findOne({
      where: { userId, activityId }
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

    await activity.increment('registeredCount');

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

    const registration = await Registration.findByPk(id);
    if (!registration) {
      throw new AppError('Registration not found', 404);
    }

    await registration.update({ status });

    res.json({
      success: true,
      data: registration
    });
  } catch (error) {
    next(error);
  }
};
