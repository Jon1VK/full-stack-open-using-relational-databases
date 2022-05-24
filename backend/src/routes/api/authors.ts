import { Router } from "express";
import { Blog } from "../../models";
import { sequelize } from "../../utils/sequalize";

const authorsRouter = Router();

authorsRouter.get("/", async (_req, res) => {
  const blogs = await Blog.findAll({
    attributes: [
      "author",
      [sequelize.fn("COUNT", sequelize.col("id")), "articles"],
      [sequelize.fn("SUM", sequelize.col("likes")), "likes"],
    ],
    group: "author",
    order: [[sequelize.fn("SUM", sequelize.col("likes")), "DESC"]],
  });
  res.json(blogs);
});

export default authorsRouter;
