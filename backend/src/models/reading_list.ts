import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { Blog } from ".";
import { sequelize } from "../utils/sequalize";
import User from "./user";

class ReadingList extends Model<
  InferAttributes<ReadingList>,
  InferCreationAttributes<ReadingList>
> {
  declare id: CreationOptional<number>;
  declare userId: ForeignKey<User["id"]>;
  declare blogId: ForeignKey<Blog["id"]>;
  declare read: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

ReadingList.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    underscored: true,
    modelName: "reading_list",
  }
);

export default ReadingList;
