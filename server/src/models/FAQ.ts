import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface FAQAttributes {
  id: number;
  category: string;
  question: string;
  answer: string;
  displayOrder: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface FAQCreationAttributes extends Optional<FAQAttributes, 'id' | 'displayOrder' | 'isActive'> {}

export class FAQ extends Model<FAQAttributes, FAQCreationAttributes> implements FAQAttributes {
  public id!: number;
  public category!: string;
  public question!: string;
  public answer!: string;
  public displayOrder!: number;
  public isActive!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

FAQ.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    question: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: false
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
    tableName: 'faqs'
  }
);
