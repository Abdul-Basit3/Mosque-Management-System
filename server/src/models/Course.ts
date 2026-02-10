import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface CourseAttributes {
  id: number;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  thumbnail?: string;
  syllabus?: string;
  maxStudents?: number;
  enrollmentCount: number;
  isActive: boolean;
  startDate?: Date;
  endDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

interface CourseCreationAttributes extends Optional<CourseAttributes, 'id' | 'enrollmentCount' | 'isActive'> {}

export class Course extends Model<CourseAttributes, CourseCreationAttributes> implements CourseAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public instructor!: string;
  public duration!: string;
  public level!: 'beginner' | 'intermediate' | 'advanced';
  public thumbnail?: string;
  public syllabus?: string;
  public maxStudents?: number;
  public enrollmentCount!: number;
  public isActive!: boolean;
  public startDate?: Date;
  public endDate?: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Course.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    instructor: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    duration: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    level: {
      type: DataTypes.ENUM('beginner', 'intermediate', 'advanced'),
      allowNull: false
    },
    thumbnail: {
      type: DataTypes.STRING(500)
    },
    syllabus: {
      type: DataTypes.TEXT
    },
    maxStudents: {
      type: DataTypes.INTEGER
    },
    enrollmentCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    startDate: {
      type: DataTypes.DATE
    },
    endDate: {
      type: DataTypes.DATE
    }
  },
  {
    sequelize,
    tableName: 'courses'
  }
);
