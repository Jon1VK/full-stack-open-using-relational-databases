import Blog from "./blog";
import User from "./user";
import ReadingList from "./reading_list";

Blog.belongsTo(User);
User.hasMany(Blog);

User.hasMany(ReadingList, { foreignKey: { allowNull: false } });
Blog.hasMany(ReadingList, { foreignKey: { allowNull: false } });
ReadingList.belongsTo(User);
ReadingList.belongsTo(Blog);
User.belongsToMany(Blog, { through: ReadingList, as: "readings" });
Blog.belongsToMany(User, { through: ReadingList });

export { Blog, User, ReadingList };
