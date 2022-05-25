import { DataTypes, QueryInterface } from "sequelize";

export const up = async ({
  context: queryInterface,
}: {
  context: QueryInterface;
}) => {
  await queryInterface.addColumn("blogs", "year", {
    type: DataTypes.INTEGER,
    allowNull: false,
  });
};

export const down = async ({
  context: queryInterface,
}: {
  context: QueryInterface;
}) => {
  await queryInterface.removeColumn("blogs", "year");
};
