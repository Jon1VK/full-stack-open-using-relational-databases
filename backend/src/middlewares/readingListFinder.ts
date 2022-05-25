import { RequestHandler } from "express";
import { ReadingList } from "../models";

const readingListFinder: RequestHandler = async (req, res, next) => {
  const readingList = await ReadingList.findByPk(req.params.id);
  if (readingList) {
    req.readingList = readingList;
    next();
  } else {
    res.status(404).end();
  }
};

export default readingListFinder;
