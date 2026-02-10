import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import { User } from './User';
import { Activity } from './Activity';

interface RegistrationAttributes {
  id: number;
  userId: number;
  activityId: number;
  status: 'pending' | 'approved' | 'rejected' | 'attended' | 'cancelled';
  notes?: string;
  registeredAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

interface RegistrationCreationAttributes extends Optional<RegistrationAttributes, 'id' | 'status'> {}

export class Registration extends Model<RegistrationAttributes, RegistrationCreationAttributes> implements RegistrationAttributes {
  public id!: number;
  public userId!: number;
  public activityId!: number;
  public status!: 'pending' | 'approved' | 'rejected' | 'attended' | 'cancelled';
  public notes?: string;
  public registeredAt!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Registration.init(
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
    activityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'activities', key: 'id' }
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected', 'attended', 'cancelled'),
      defaultValue: 'pending'
    },
    notes: {
      type: DataTypes.TEXT
    },
    registeredAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    tableName: 'registrations'
  }
);

User.hasMany(Registration, { foreignKey: 'userId' });
Registration.belongsTo(User, { foreignKey: 'userId' });
Activity.hasMany(Registration, { foreignKey: 'activityId' });
Registration.belongsTo(Activity, { foreignKey: 'activityId' });
