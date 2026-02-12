import { Request, Response, NextFunction } from 'express';
import { Executive } from '../models/Executive';
import { AppError } from '../middleware/errorHandler';

export const getAllExecutives = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const executives = await Executive.find({ isActive: true })
      .sort({ displayOrder: 1, lastName: 1 });

    res.json({
      success: true,
      data: executives
    });
  } catch (error) {
    next(error);
  }
};

export const getExecutiveById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const executive = await Executive.findById(id);

    if (!executive) {
      throw new AppError('Executive not found', 404);
    }

    res.json({
      success: true,
      data: executive
    });
  } catch (error) {
    next(error);
  }
};

export const createExecutive = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const executive = await Executive.create(req.body);

    res.status(201).json({
      success: true,
      data: executive
    });
  } catch (error) {
    next(error);
  }
};

export const updateExecutive = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const executive = await Executive.findById(id);

    if (!executive) {
      throw new AppError('Executive not found', 404);
    }

    Object.assign(executive, req.body);
    await executive.save();

    res.json({
      success: true,
      data: executive
    });
  } catch (error) {
    next(error);
  }
};

export const deleteExecutive = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const executive = await Executive.findById(id);

    if (!executive) {
      throw new AppError('Executive not found', 404);
    }

    await executive.deleteOne();

    res.json({
      success: true,
      message: 'Executive deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
