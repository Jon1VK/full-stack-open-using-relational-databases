import { Router } from "express";
import bcrypt from "bcrypt";
import { Attributes } from "sequelize/types";
import { User } from "../../models";

const sessionRouter = Router();

sessionRouter.post("/", async (req, res) => {
  const { username, password } = req.body as PermittedPostAttributes;

  const user = await User.findOne({
    where: {
      username,
    },
  });

  if (!(user && (await bcrypt.compare(password, user.passwordHash)))) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  if (!user.active) {
    return res.status(403).json({ error: "User has been disabled" });
  }

  req.session.userId = user.id;

  res.json({
    username: user.username,
    name: user.name,
  });
});

sessionRouter.delete("/", (req, res) => {
  req.session.destroy((err) => console.error(err));
  res.status(204).end();
});

type PermittedPostAttributes = Pick<Attributes<User>, "username" | "password">;

export default sessionRouter;
