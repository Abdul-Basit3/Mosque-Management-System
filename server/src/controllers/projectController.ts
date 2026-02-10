import { Request, Response, NextFunction } from 'express';
import { Project } from '../models/Project';
import { Donation } from '../models/Donation';
import { AppError } from '../middleware/errorHandler';

export const getAllProjects = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category, status } = req.query;
    const where: any = { isActive: true };

    if (category) where.category = category;
    if (status) where.status = status;

    const projects = await Project.findAll({
      where,
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: projects
    });
  } catch (error) {
    next(error);
  }
};

export const getProjectById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const project = await Project.findByPk(id, {
      include: [{ model: Donation, as: 'Donations' }]
    });

    if (!project) {
      throw new AppError('Project not found', 404);
    }

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await Project.create(req.body);

    res.status(201).json({
      success: true,
      data: project
    });
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const project = await Project.findByPk(id);

    if (!project) {
      throw new AppError('Project not found', 404);
    }

    await project.update(req.body);

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    next(error);
  }
};

export const donateToProject = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { projectId } = req.params;
    const { amount, donorName, donorEmail, message, paymentMethod, isAnonymous } = req.body;

    const project = await Project.findByPk(projectId);
    if (!project) {
      throw new AppError('Project not found', 404);
    }

    const donation = await Donation.create({
      userId: req.user?.id,
      projectId: Number(projectId),
      amount,
      donorName,
      donorEmail,
      message,
      paymentMethod,
      isAnonymous,
      status: 'completed'
    });

    await project.increment('fundingRaised', { by: amount });

    res.status(201).json({
      success: true,
      data: donation
    });
  } catch (error) {
    next(error);
  }
};
