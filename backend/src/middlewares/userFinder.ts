import { RequestHandler } from "express";
import { User } from "../models";

const userFinder: RequestHandler = async (req, res, next) => {
  const user = await User.findOne({ where: { username: req.params.username } });
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(404).end();
  }
};

export default userFinder;
