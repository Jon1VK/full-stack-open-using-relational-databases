import Blog from "./blog";
import User from "./user";

Blog.belongsTo(User);
User.hasMany(Blog);

void User.sync({ alter: true });
void Blog.sync({ alter: true });

export { Blog, User };
