import Blog from "./models/blog";

void Blog.findAll().then((blogs) => {
  blogs.forEach((blog) => {
    console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`);
  });
});
