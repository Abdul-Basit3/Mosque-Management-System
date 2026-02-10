import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface ProjectAttributes {
  id: number;
  title: string;
  description: string;
  category: 'building' | 'charity' | 'education' | 'community' | 'other';
  status: 'planning' | 'ongoing' | 'completed' | 'paused';
  fundingGoal?: number;
  fundingRaised: number;
  startDate?: Date;
  endDate?: Date;
  images?: string[];
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ProjectCreationAttributes extends Optional<ProjectAttributes, 'id' | 'fundingRaised' | 'isActive'> {}

export class Project extends Model<ProjectAttributes, ProjectCreationAttributes> implements ProjectAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public category!: 'building' | 'charity' | 'education' | 'community' | 'other';
  public status!: 'planning' | 'ongoing' | 'completed' | 'paused';
  public fundingGoal?: number;
  public fundingRaised!: number;
  public startDate?: Date;
  public endDate?: Date;
  public images?: string[];
  public isActive!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Project.init(
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
    category: {
      type: DataTypes.ENUM('building', 'charity', 'education', 'community', 'other'),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('planning', 'ongoing', 'completed', 'paused'),
      allowNull: false
    },
    fundingGoal: {
      type: DataTypes.DECIMAL(10, 2)
    },
    fundingRaised: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    startDate: {
      type: DataTypes.DATE
    },
    endDate: {
      type: DataTypes.DATE
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    sequelize,
    tableName: 'projects'
  }
);
