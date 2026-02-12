import { Request, Response, NextFunction } from 'express';
import { Lecture } from '../models/Lecture';
import { AppError } from '../middleware/errorHandler';

export const getAllLectures = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { search, topic, speaker, page = 1, limit = 10 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const filter: any = { isPublished: true };

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    if (topic) filter.topic = topic;
    if (speaker) filter.speaker = { $regex: speaker, $options: 'i' };

    const [rows, count] = await Promise.all([
      Lecture.find(filter)
        .limit(Number(limit))
        .skip(skip)
        .sort({ publishedAt: -1 }),
      Lecture.countDocuments(filter)
    ]);

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
    const lecture = await Lecture.findById(id);

    if (!lecture) {
      throw new AppError('Lecture not found', 404);
    }

    lecture.views += 1;
    await lecture.save();

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
    const lecture = await Lecture.findById(id);

    if (!lecture) {
      throw new AppError('Lecture not found', 404);
    }

    Object.assign(lecture, req.body);
    await lecture.save();

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
    const lecture = await Lecture.findById(id);

    if (!lecture) {
      throw new AppError('Lecture not found', 404);
    }

    await lecture.deleteOne();

    res.json({
      success: true,
      message: 'Lecture deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
