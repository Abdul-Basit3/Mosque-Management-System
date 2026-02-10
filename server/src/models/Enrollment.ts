import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import { User } from './User';
import { Course } from './Course';

interface EnrollmentAttributes {
  id: number;
  userId: number;
  courseId: number;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  progress: number;
  enrolledAt: Date;
  completedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

interface EnrollmentCreationAttributes extends Optional<EnrollmentAttributes, 'id' | 'status' | 'progress'> {}

export class Enrollment extends Model<EnrollmentAttributes, EnrollmentCreationAttributes> implements EnrollmentAttributes {
  public id!: number;
  public userId!: number;
  public courseId!: number;
  public status!: 'pending' | 'approved' | 'rejected' | 'completed';
  public progress!: number;
  public enrolledAt!: Date;
  public completedAt?: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Enrollment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' }
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'courses', key: 'id' }
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected', 'completed'),
      defaultValue: 'pending'
    },
    progress: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: { min: 0, max: 100 }
    },
    enrolledAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    completedAt: {
      type: DataTypes.DATE
    }
  },
  {
    sequelize,
    tableName: 'enrollments'
  }
);

User.hasMany(Enrollment, { foreignKey: 'userId' });
Enrollment.belongsTo(User, { foreignKey: 'userId' });
Course.hasMany(Enrollment, { foreignKey: 'courseId' });
Enrollment.belongsTo(Course, { foreignKey: 'courseId' });
