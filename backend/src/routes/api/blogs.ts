import { Request, Router } from "express";
import { Op } from "sequelize";
import { Attributes, WhereOptions } from "sequelize/types";
import {
  blogFinder,
  currentUserFromToken,
  tokenExtractor,
} from "../../middlewares";
import { Blog, User } from "../../models";

const blogsRouter = Router();

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: {
      exclude: ["userId"],
    },
    include: {
      model: User,
      attributes: ["name"],
    },
    where: getWhereClause(req.query),
    order: [["likes", "DESC"]],
  });
  res.json(blogs);
});

blogsRouter.post(
  "/",
  tokenExtractor,
  currentUserFromToken,
  async (req, res) => {
    const params = permittedPostAttributes(req.body as Attributes<Blog>);
    const blog = await Blog.create({ ...params, userId: req.currentUser.id });
    res.json(blog);
  }
);

blogsRouter.get("/:id", blogFinder, (req: Request, res) => {
  res.json(req.blog);
});

blogsRouter.put("/:id", blogFinder, async (req, res) => {
  const params = permittedPutAttributes(req.body as Attributes<Blog>);
  await req.blog.update(params);
  res.json(req.blog);
});

blogsRouter.delete(
  "/:id",
  tokenExtractor,
  currentUserFromToken,
  blogFinder,
  async (req, res) => {
    if (req.currentUser.id === req.blog.userId) {
      await req.blog.destroy();
      res.status(204).end();
    } else {
      res.status(403).end();
    }
  }
);

const getWhereClause = (query: qs.ParsedQs) => {
  let where: WhereOptions<Attributes<Blog>> = {};
  if (query.search) {
    const caseInsensitiveSearch = {
      [Op.iLike]: `%${query.search.toString()}%`,
    };
    where = {
      [Op.or]: {
        title: caseInsensitiveSearch,
        author: caseInsensitiveSearch,
      },
    };
  }
  return where;
};

type PermittedPostAttributes = Pick<
  Attributes<Blog>,
  "author" | "title" | "url" | "likes"
>;

type PermittedPutAttributes = Pick<Attributes<Blog>, "likes">;

const permittedPostAttributes = ({
  author,
  title,
  url,
  likes,
}: Attributes<Blog>): PermittedPostAttributes => ({
  author,
  url,
  title,
  likes,
});

const permittedPutAttributes = ({
  likes,
}: Attributes<Blog>): PermittedPutAttributes => ({
  likes,
});

export default blogsRouter;
