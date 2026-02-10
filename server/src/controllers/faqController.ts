import { Request, Response, NextFunction } from 'express';
import { FAQ } from '../models/FAQ';
import { AppError } from '../middleware/errorHandler';

export const getAllFAQs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category } = req.query;
    const where: any = { isActive: true };

    if (category) where.category = category;

    const faqs = await FAQ.findAll({
      where,
      order: [['category', 'ASC'], ['displayOrder', 'ASC']]
    });

    res.json({
      success: true,
      data: faqs
    });
  } catch (error) {
    next(error);
  }
};

export const createFAQ = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const faq = await FAQ.create(req.body);

    res.status(201).json({
      success: true,
      data: faq
    });
  } catch (error) {
    next(error);
  }
};

export const updateFAQ = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const faq = await FAQ.findByPk(id);

    if (!faq) {
      throw new AppError('FAQ not found', 404);
    }

    await faq.update(req.body);

    res.json({
      success: true,
      data: faq
    });
  } catch (error) {
    next(error);
  }
};

export const deleteFAQ = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const faq = await FAQ.findByPk(id);

    if (!faq) {
      throw new AppError('FAQ not found', 404);
    }

    await faq.destroy();

    res.json({
      success: true,
      message: 'FAQ deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
