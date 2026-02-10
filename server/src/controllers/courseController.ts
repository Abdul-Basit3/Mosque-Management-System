import { Request, Response, NextFunction } from 'express';
import { Course } from '../models/Course';
import { Enrollment } from '../models/Enrollment';
import { AppError } from '../middleware/errorHandler';
import { Op } from 'sequelize';

export const getAllCourses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { search, level, page = 1, limit = 10 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);
    const where: any = { isActive: true };

    if (search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } }
      ];
    }

    if (level) where.level = level;

    const { count, rows } = await Course.findAndCountAll({
      where,
      limit: Number(limit),
      offset,
      order: [['createdAt', 'DESC']]
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

export const getCourseById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const course = await Course.findByPk(id);

    if (!course) {
      throw new AppError('Course not found', 404);
    }

    res.json({
      success: true,
      data: course
    });
  } catch (error) {
    next(error);
  }
};

export const createCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const course = await Course.create(req.body);

    res.status(201).json({
      success: true,
      data: course
    });
  } catch (error) {
    next(error);
  }
};

export const updateCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const course = await Course.findByPk(id);

    if (!course) {
      throw new AppError('Course not found', 404);
    }

    await course.update(req.body);

    res.json({
      success: true,
      data: course
    });
  } catch (error) {
    next(error);
  }
};

export const enrollInCourse = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.id;

    const course = await Course.findByPk(courseId);
    if (!course) {
      throw new AppError('Course not found', 404);
    }

    if (course.maxStudents && course.enrollmentCount >= course.maxStudents) {
      throw new AppError('Course is full', 400);
    }

    const existingEnrollment = await Enrollment.findOne({
      where: { userId, courseId }
    });

    if (existingEnrollment) {
      throw new AppError('Already enrolled in this course', 400);
    }

    const enrollment = await Enrollment.create({
      userId,
      courseId: Number(courseId),
      enrolledAt: new Date()
    });

    await course.increment('enrollmentCount');

    res.status(201).json({
      success: true,
      data: enrollment
    });
  } catch (error) {
    next(error);
  }
};
