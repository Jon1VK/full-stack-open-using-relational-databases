import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../utils/sequalize";
import User from "./user";

class Blog extends Model<InferAttributes<Blog>, InferCreationAttributes<Blog>> {
  declare id: CreationOptional<number>;
  declare author: CreationOptional<string>;
  declare url: string;
  declare title: string;
  declare year: number;
  declare likes: CreationOptional<number>;
  declare userId: ForeignKey<User["id"]>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: DataTypes.STRING,
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1991,
        customMax(value: string) {
          if (parseInt(value) > new Date().getFullYear()) {
            throw new Error("Year must not be in the future");
          }
        },
      },
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        isInt: true,
        min: 0,
      },
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    underscored: true,
    modelName: "blog",
  }
);

export default Blog;
