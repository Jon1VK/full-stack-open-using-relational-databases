import Blog from "./blog";
import User from "./user";

Blog.belongsTo(User);
User.hasMany(Blog);

export { Blog, User };
