import { Router } from "express";
import { Attributes, WhereOptions } from "sequelize/types";
import { currentUserFromSession, userFinder } from "../../middlewares";
import { Blog, ReadingList, User } from "../../models";

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

usersRouter.get("/:id", async (req, res) => {
  let where: WhereOptions<Attributes<ReadingList>> = {};
  if (req.query.read) {
    where = {
      read: req.query.read === "true",
    };
  }
  const user = await User.findByPk(req.params.id, {
    attributes: ["name", "username"],
    include: {
      model: Blog,
      through: { attributes: ["id", "read"], as: "readinglist", where },
      as: "readings",
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId"],
      },
    },
  });
  res.json(user);
});

usersRouter.put(
  "/:username",
  currentUserFromSession,
  userFinder,
  async (req, res) => {
    if (req.currentUser.id !== req.user.id) {
      return res.status(403).end();
    }
    const params = permittedPutAttributes(req.body as Attributes<User>);
    const updatedUser = await req.user.update(params);
    res.json(updatedUser);
  }
);

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
