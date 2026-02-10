import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface PrayerTimeAttributes {
  id: number;
  date: Date;
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  location: string;
  latitude?: number;
  longitude?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface PrayerTimeCreationAttributes extends Optional<PrayerTimeAttributes, 'id'> {}

export class PrayerTime extends Model<PrayerTimeAttributes, PrayerTimeCreationAttributes> implements PrayerTimeAttributes {
  public id!: number;
  public date!: Date;
  public fajr!: string;
  public sunrise!: string;
  public dhuhr!: string;
  public asr!: string;
  public maghrib!: string;
  public isha!: string;
  public location!: string;
  public latitude?: number;
  public longitude?: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

PrayerTime.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      unique: true
    },
    fajr: {
      type: DataTypes.TIME,
      allowNull: false
    },
    sunrise: {
      type: DataTypes.TIME,
      allowNull: false
    },
    dhuhr: {
      type: DataTypes.TIME,
      allowNull: false
    },
    asr: {
      type: DataTypes.TIME,
      allowNull: false
    },
    maghrib: {
      type: DataTypes.TIME,
      allowNull: false
    },
    isha: {
      type: DataTypes.TIME,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    latitude: {
      type: DataTypes.DECIMAL(10, 8)
    },
    longitude: {
      type: DataTypes.DECIMAL(11, 8)
    }
  },
  {
    sequelize,
    tableName: 'prayer_times'
  }
);
