import { Request, Response, NextFunction } from 'express';
import { Content } from '../models/Content';
import { AppError } from '../middleware/errorHandler';

export const getActiveContent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { type } = req.query;
    const where: any = { isActive: true };
    
    if (type) {
      where.type = type;
    }

    const content = await Content.findAll({
      where,
      order: [['displayOrder', 'ASC'], ['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: content
    });
  } catch (error) {
    next(error);
  }
};

export const getRandomContent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { type } = req.query;
    const where: any = { isActive: true };
    
    if (type) {
      where.type = type;
    }

    const content = await Content.findAll({ where });
    const randomContent = content[Math.floor(Math.random() * content.length)];

    res.json({
      success: true,
      data: randomContent
    });
  } catch (error) {
    next(error);
  }
};

export const createContent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const content = await Content.create(req.body);

    res.status(201).json({
      success: true,
      data: content
    });
  } catch (error) {
    next(error);
  }
};

export const updateContent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const content = await Content.findByPk(id);

    if (!content) {
      throw new AppError('Content not found', 404);
    }

    await content.update(req.body);

    res.json({
      success: true,
      data: content
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const content = await Content.findByPk(id);

    if (!content) {
      throw new AppError('Content not found', 404);
    }

    await content.destroy();

    res.json({
      success: true,
      message: 'Content deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
