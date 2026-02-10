import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface ActivityAttributes {
  id: number;
  title: string;
  description: string;
  type: 'seminar' | 'competition' | 'youth_program' | 'community' | 'other';
  location: string;
  startDate: Date;
  endDate?: Date;
  maxParticipants?: number;
  registeredCount: number;
  requiresApproval: boolean;
  isActive: boolean;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ActivityCreationAttributes extends Optional<ActivityAttributes, 'id' | 'registeredCount' | 'requiresApproval' | 'isActive'> {}

export class Activity extends Model<ActivityAttributes, ActivityCreationAttributes> implements ActivityAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public type!: 'seminar' | 'competition' | 'youth_program' | 'community' | 'other';
  public location!: string;
  public startDate!: Date;
  public endDate?: Date;
  public maxParticipants?: number;
  public registeredCount!: number;
  public requiresApproval!: boolean;
  public isActive!: boolean;
  public image?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Activity.init(
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
    type: {
      type: DataTypes.ENUM('seminar', 'competition', 'youth_program', 'community', 'other'),
      allowNull: false
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE
    },
    maxParticipants: {
      type: DataTypes.INTEGER
    },
    registeredCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    requiresApproval: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    image: {
      type: DataTypes.STRING(500)
    }
  },
  {
    sequelize,
    tableName: 'activities'
  }
);
