import bcrypt from "bcrypt";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../utils/sequalize";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare username: string;
  declare passwordHash: CreationOptional<string>;
  declare password: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    passwordHash: DataTypes.STRING,
    password: {
      type: DataTypes.VIRTUAL,
      validate: {
        len: [6, Number.MAX_SAFE_INTEGER],
      },
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    validate: {
      passwordNotNullOnCreate() {
        if (this.isNewRecord && this.password == null) {
          throw Error("user.password cannot be null");
        }
      },
    },
    hooks: {
      async beforeCreate(user) {
        if (user.password != null) {
          user.passwordHash = await bcrypt.hash(user.password, 10);
        }
      },
    },
    sequelize,
    underscored: true,
    modelName: "user",
  }
);

export default User;
