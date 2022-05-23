import { Router } from "express";
import { Attributes } from "sequelize/types";
import { userFinder } from "../../middlewares";
import { Blog, User } from "../../models";

const usersRouter = Router();

usersRouter.get("/", async (_req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ["passwordHash"] },
    include: {
      model: Blog,
      attributes: {
        exclude: ["userId"],
      },
    },
  });
  res.json(users);
});

usersRouter.post("/", async (req, res) => {
  const params = permittedPostAttributes(req.body as Attributes<User>);
  const user = await User.create(params);
  res.json(user);
});

usersRouter.put("/:username", userFinder, async (req, res) => {
  const params = permittedPutAttributes(req.body as Attributes<User>);
  const updatedUser = await req.user.update(params);
  res.json(updatedUser);
});

type PermittedPostAttributes = Pick<
  Attributes<User>,
  "name" | "username" | "password"
>;

type PermittedPutAttributes = Pick<
  Attributes<User>,
  "name" | "username" | "password"
>;

const permittedPostAttributes = ({
  name,
  username,
  password,
}: Attributes<User>): PermittedPostAttributes => ({
  name,
  username,
  password,
});

const permittedPutAttributes = ({
  name,
  username,
  password,
}: Attributes<User>): PermittedPutAttributes => ({
  name,
  username,
  password,
});

export default usersRouter;
