import { RequestHandler } from "express";
import { Blog } from "../models";

const blogFinder: RequestHandler = async (req, res, next) => {
  const blog = await Blog.findByPk(req.params.id);
  if (blog) {
    req.blog = blog;
    next();
  } else {
    res.status(404).end();
  }
};

export default blogFinder;
