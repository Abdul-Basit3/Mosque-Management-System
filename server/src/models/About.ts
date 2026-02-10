import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface AboutAttributes {
  id: number;
  organizationName: string;
  history?: string;
  mission?: string;
  vision?: string;
  values?: string;
  address?: string;
  phone?: string;
  email?: string;
  facebookUrl?: string;
  twitterUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  tiktokUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface AboutCreationAttributes extends Optional<AboutAttributes, 'id'> {}

export class About extends Model<AboutAttributes, AboutCreationAttributes> implements AboutAttributes {
  public id!: number;
  public organizationName!: string;
  public history?: string;
  public mission?: string;
  public vision?: string;
  public values?: string;
  public address?: string;
  public phone?: string;
  public email?: string;
  public facebookUrl?: string;
  public twitterUrl?: string;
  public instagramUrl?: string;
  public youtubeUrl?: string;
  public tiktokUrl?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

About.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    organizationName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    history: {
      type: DataTypes.TEXT
    },
    mission: {
      type: DataTypes.TEXT
    },
    vision: {
      type: DataTypes.TEXT
    },
    values: {
      type: DataTypes.TEXT
    },
    address: {
      type: DataTypes.TEXT
    },
    phone: {
      type: DataTypes.STRING(20)
    },
    email: {
      type: DataTypes.STRING(255)
    },
    facebookUrl: {
      type: DataTypes.STRING(500)
    },
    twitterUrl: {
      type: DataTypes.STRING(500)
    },
    instagramUrl: {
      type: DataTypes.STRING(500)
    },
    youtubeUrl: {
      type: DataTypes.STRING(500)
    },
    tiktokUrl: {
      type: DataTypes.STRING(500)
    }
  },
  {
    sequelize,
    tableName: 'about'
  }
);
