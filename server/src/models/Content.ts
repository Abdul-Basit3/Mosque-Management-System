import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface ContentAttributes {
  id: number;
  type: 'dua' | 'verse' | 'hadith';
  title: string;
  arabicText: string;
  transliteration?: string;
  translation: string;
  reference?: string;
  isActive: boolean;
  displayOrder?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ContentCreationAttributes extends Optional<ContentAttributes, 'id' | 'isActive'> {}

export class Content extends Model<ContentAttributes, ContentCreationAttributes> implements ContentAttributes {
  public id!: number;
  public type!: 'dua' | 'verse' | 'hadith';
  public title!: string;
  public arabicText!: string;
  public transliteration?: string;
  public translation!: string;
  public reference?: string;
  public isActive!: boolean;
  public displayOrder?: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Content.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    type: {
      type: DataTypes.ENUM('dua', 'verse', 'hadith'),
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    arabicText: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    transliteration: {
      type: DataTypes.TEXT
    },
    translation: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    reference: {
      type: DataTypes.STRING(255)
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    displayOrder: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  },
  {
    sequelize,
    tableName: 'contents'
  }
);
