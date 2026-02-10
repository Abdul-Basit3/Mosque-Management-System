import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import { User } from './User';
import { Project } from './Project';

interface DonationAttributes {
  id: number;
  userId?: number;
  projectId?: number;
  amount: number;
  donorName?: string;
  donorEmail?: string;
  message?: string;
  paymentMethod: 'card' | 'bank' | 'cash' | 'other';
  transactionId?: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  isAnonymous: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface DonationCreationAttributes extends Optional<DonationAttributes, 'id' | 'status' | 'isAnonymous'> {}

export class Donation extends Model<DonationAttributes, DonationCreationAttributes> implements DonationAttributes {
  public id!: number;
  public userId?: number;
  public projectId?: number;
  public amount!: number;
  public donorName?: string;
  public donorEmail?: string;
  public message?: string;
  public paymentMethod!: 'card' | 'bank' | 'cash' | 'other';
  public transactionId?: string;
  public status!: 'pending' | 'completed' | 'failed' | 'refunded';
  public isAnonymous!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Donation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      references: { model: 'users', key: 'id' }
    },
    projectId: {
      type: DataTypes.INTEGER,
      references: { model: 'projects', key: 'id' }
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    donorName: {
      type: DataTypes.STRING(255)
    },
    donorEmail: {
      type: DataTypes.STRING(255)
    },
    message: {
      type: DataTypes.TEXT
    },
    paymentMethod: {
      type: DataTypes.ENUM('card', 'bank', 'cash', 'other'),
      allowNull: false
    },
    transactionId: {
      type: DataTypes.STRING(255)
    },
    status: {
      type: DataTypes.ENUM('pending', 'completed', 'failed', 'refunded'),
      defaultValue: 'pending'
    },
    isAnonymous: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    sequelize,
    tableName: 'donations'
  }
);

User.hasMany(Donation, { foreignKey: 'userId' });
Donation.belongsTo(User, { foreignKey: 'userId' });
Project.hasMany(Donation, { foreignKey: 'projectId' });
Donation.belongsTo(Project, { foreignKey: 'projectId' });
