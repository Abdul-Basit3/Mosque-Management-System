import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { AppError } from '../middleware/errorHandler';

const generateToken = (id: string): string => {
  const secret = process.env.JWT_SECRET || 'your-secret-key';
  return jwt.sign(
    { id },
    secret,
    {
      expiresIn: process.env.JWT_EXPIRE || '7d'
    } as any
  );
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { firstName, lastName, email, password, phone, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new AppError('Email already registered', 400);
    }

    // Create new user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      phone,
      role: role || 'public'
    });

    // Generate JWT token
    const token = generateToken(user._id.toString());

    // Get role-based redirect URL
    const redirectUrl = getRoleBasedRedirect(user.role);

    // Send response
    res.status(201).json({
      success: true,
      data: {
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          avatar: user.avatar
        },
        token,
        redirectUrl
      },
      message: 'Registration successful'
    });
  } catch (error) {
    next(error);
  }
};

// Role-based redirect URL mapping
const getRoleBasedRedirect = (role: string): string => {
  const redirectMap: Record<string, string> = {
    admin: '/admin/dashboard',
    staff: '/staff/dashboard',
    student: '/student/dashboard',
    public: '/dashboard'
  };

  return redirectMap[role] || '/dashboard';
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      throw new AppError('Please provide email and password', 400);
    }

    // Find user and include password for comparison
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new AppError('Invalid credentials', 401);
    }

    // Check if account is active
    if (!user.isActive) {
      throw new AppError('Account is deactivated. Please contact support.', 403);
    }

    // Generate JWT token
    const token = generateToken(user._id.toString());

    // Get role-based redirect URL
    const redirectUrl = getRoleBasedRedirect(user.role);

    // Update last login timestamp
    await User.findByIdAndUpdate(user._id, { lastLogin: new Date() });

    // Send response with user data, token, and redirect URL
    res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          avatar: user.avatar
        },
        token,
        redirectUrl
      },
      message: 'Login successful'
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req: any, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};
