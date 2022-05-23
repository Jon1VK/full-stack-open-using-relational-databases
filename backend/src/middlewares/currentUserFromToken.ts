import { RequestHandler } from "express";
import { User } from "../models";

const currentUserFromToken: RequestHandler = async (req, res, next) => {
  const currentUser = await User.findByPk(req.token.userId);
  if (currentUser) {
    req.currentUser = currentUser;
    next();
  } else {
    res.status(401).json({ error: "Unauthenticated" });
  }
};

export default currentUserFromToken;
