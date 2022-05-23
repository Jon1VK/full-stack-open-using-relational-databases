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
  declare likes: CreationOptional<number>;
  declare userId: ForeignKey<User["id"]>;
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
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        isInt: true,
        min: 0,
      },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "blog",
  }
);

export default Blog;