import { DataTypes, QueryInterface } from "sequelize";

export const up = async ({
  context: queryInterface,
}: {
  context: QueryInterface;
}) => {
  await queryInterface.addColumn("users", "active", {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  });
};

export const down = async ({
  context: queryInterface,
}: {
  context: QueryInterface;
}) => {
  await queryInterface.removeColumn("users", "active");
};
