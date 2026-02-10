import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface ExecutiveAttributes {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
  department?: string;
  bio?: string;
  photo?: string;
  email?: string;
  phone?: string;
  displayOrder: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ExecutiveCreationAttributes extends Optional<ExecutiveAttributes, 'id' | 'displayOrder' | 'isActive'> {}

export class Executive extends Model<ExecutiveAttributes, ExecutiveCreationAttributes> implements ExecutiveAttributes {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public role!: string;
  public department?: string;
  public bio?: string;
  public photo?: string;
  public email?: string;
  public phone?: string;
  public displayOrder!: number;
  public isActive!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Executive.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    role: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    department: {
      type: DataTypes.STRING(255)
    },
    bio: {
      type: DataTypes.TEXT
    },
    photo: {
      type: DataTypes.STRING(500)
    },
    email: {
      type: DataTypes.STRING(255)
    },
    phone: {
      type: DataTypes.STRING(20)
    },
    displayOrder: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    sequelize,
    tableName: 'executives'
  }
);
