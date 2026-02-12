import { Request, Response, NextFunction } from 'express';
import { FAQ } from '../models/FAQ';
import { AppError } from '../middleware/errorHandler';

export const getAllFAQs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category } = req.query;
    const filter: any = { isActive: true };

    if (category) filter.category = category;

    const faqs = await FAQ.find(filter)
      .sort({ category: 1, displayOrder: 1 });

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
    const faq = await FAQ.findById(id);

    if (!faq) {
      throw new AppError('FAQ not found', 404);
    }

    Object.assign(faq, req.body);
    await faq.save();

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
    const faq = await FAQ.findById(id);

    if (!faq) {
      throw new AppError('FAQ not found', 404);
    }

    await faq.deleteOne();

    res.json({
      success: true,
      message: 'FAQ deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
