import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Attributes } from "sequelize/types";
import { User } from "../../models";
import config from "../../utils/config";
import { EnvironmentVariable } from "../../types";

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

  const token = jwt.sign(
    { userId: user.id },
    config(EnvironmentVariable.JWT_SECRET)
  );

  res.json({
    token: `Bearer ${token}`,
    username: user.username,
    name: user.name,
  });
});

type PermittedPostAttributes = Pick<Attributes<User>, "username" | "password">;

export default sessionRouter;
