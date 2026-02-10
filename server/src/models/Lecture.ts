import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface LectureAttributes {
  id: number;
  title: string;
  description: string;
  speaker: string;
  topic: string;
  videoType: 'upload' | 'youtube' | 'vimeo';
  videoUrl: string;
  thumbnail?: string;
  duration?: number;
  views: number;
  isPublished: boolean;
  publishedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

interface LectureCreationAttributes extends Optional<LectureAttributes, 'id' | 'views' | 'isPublished'> {}

export class Lecture extends Model<LectureAttributes, LectureCreationAttributes> implements LectureAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public speaker!: string;
  public topic!: string;
  public videoType!: 'upload' | 'youtube' | 'vimeo';
  public videoUrl!: string;
  public thumbnail?: string;
  public duration?: number;
  public views!: number;
  public isPublished!: boolean;
  public publishedAt?: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Lecture.init(
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
    speaker: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    topic: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    videoType: {
      type: DataTypes.ENUM('upload', 'youtube', 'vimeo'),
      allowNull: false
    },
    videoUrl: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    thumbnail: {
      type: DataTypes.STRING(500)
    },
    duration: {
      type: DataTypes.INTEGER
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    isPublished: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    publishedAt: {
      type: DataTypes.DATE
    }
  },
  {
    sequelize,
    tableName: 'lectures'
  }
);
