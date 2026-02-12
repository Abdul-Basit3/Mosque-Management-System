import { Request, Response, NextFunction } from 'express';
import { Course } from '../models/Course';
import { Enrollment } from '../models/Enrollment';
import { AppError } from '../middleware/errorHandler';

export const getAllCourses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { search, level, page = 1, limit = 10 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const filter: any = { isActive: true };

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    if (level) filter.level = level;

    const [rows, count] = await Promise.all([
      Course.find(filter)
        .limit(Number(limit))
        .skip(skip)
        .sort({ createdAt: -1 }),
      Course.countDocuments(filter)
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

export const getCourseById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);

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
    const course = await Course.findById(id);

    if (!course) {
      throw new AppError('Course not found', 404);
    }

    Object.assign(course, req.body);
    await course.save();

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

    const course = await Course.findById(courseId);
    if (!course) {
      throw new AppError('Course not found', 404);
    }

    if (course.maxStudents && course.enrollmentCount >= course.maxStudents) {
      throw new AppError('Course is full', 400);
    }

    const existingEnrollment = await Enrollment.findOne({
      userId, courseId
    });

    if (existingEnrollment) {
      throw new AppError('Already enrolled in this course', 400);
    }

    const enrollment = await Enrollment.create({
      userId,
      courseId: Number(courseId),
      enrolledAt: new Date()
    });

    course.enrollmentCount += 1;
    await course.save();

    res.status(201).json({
      success: true,
      data: enrollment
    });
  } catch (error) {
    next(error);
  }
};
