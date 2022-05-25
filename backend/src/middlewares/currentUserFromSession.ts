import { RequestHandler } from "express";
import { User } from "../models";

const currentUserFromSession: RequestHandler = async (req, res, next) => {
  console.log(req.session);
  const currentUser = await User.findByPk(req.session.userId);
  if (currentUser && currentUser.active) {
    req.currentUser = currentUser;
    next();
  } else {
    res.status(401).json({ error: "Unauthenticated" });
  }
};

export default currentUserFromSession;
