import { Request, Response, NextFunction } from 'express';
import { Lecture } from '../models/Lecture';
import { AppError } from '../middleware/errorHandler';
import { Op } from 'sequelize';

export const getAllLectures = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { search, topic, speaker, page = 1, limit = 10 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);
    const where: any = { isPublished: true };

    if (search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } }
      ];
    }

    if (topic) where.topic = topic;
    if (speaker) where.speaker = { [Op.iLike]: `%${speaker}%` };

    const { count, rows } = await Lecture.findAndCountAll({
      where,
      limit: Number(limit),
      offset,
      order: [['publishedAt', 'DESC']]
    });

    res.json({
      success: true,
      data: rows,
      pagination: {
        total: count,
        page: Number(page),
        pages: Math.ceil(count / Number(limit))
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getLectureById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const lecture = await Lecture.findByPk(id);

    if (!lecture) {
      throw new AppError('Lecture not found', 404);
    }

    await lecture.increment('views');

    res.json({
      success: true,
      data: lecture
    });
  } catch (error) {
    next(error);
  }
};

export const createLecture = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const lecture = await Lecture.create(req.body);

    res.status(201).json({
      success: true,
      data: lecture
    });
  } catch (error) {
    next(error);
  }
};

export const updateLecture = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const lecture = await Lecture.findByPk(id);

    if (!lecture) {
      throw new AppError('Lecture not found', 404);
    }

    await lecture.update(req.body);

    res.json({
      success: true,
      data: lecture
    });
  } catch (error) {
    next(error);
  }
};

export const deleteLecture = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const lecture = await Lecture.findByPk(id);

    if (!lecture) {
      throw new AppError('Lecture not found', 404);
    }

    await lecture.destroy();

    res.json({
      success: true,
      message: 'Lecture deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
