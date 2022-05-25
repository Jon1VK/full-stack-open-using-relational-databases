import { Router } from "express";
import { Attributes } from "sequelize/types";
import { currentUserFromSession, readingListFinder } from "../../middlewares";
import { ReadingList } from "../../models";

const readingListsRouter = Router();

readingListsRouter.post("/", currentUserFromSession, async (req, res) => {
  const params = permittedPostAttributes(req.body as Attributes<ReadingList>);
  const readingList = await ReadingList.create({
    userId: req.currentUser.id,
    ...params,
  });
  res.json(readingList);
});

readingListsRouter.put(
  "/:id",
  currentUserFromSession,
  readingListFinder,
  async (req, res) => {
    if (req.readingList.userId !== req.currentUser.id) {
      return res.status(403).end();
    }
    const params = permittedPutAttributes(req.body as Attributes<ReadingList>);
    await req.readingList.update(params);
    res.json(req.readingList);
  }
);

type PermittedPostAttributes = Pick<Attributes<ReadingList>, "blogId">;

type PermittedPutAttributes = Pick<ReadingList, "read">;

const permittedPostAttributes = ({
  blogId,
}: Attributes<ReadingList>): PermittedPostAttributes => ({
  blogId,
});

const permittedPutAttributes = ({
  read,
}: Attributes<ReadingList>): PermittedPutAttributes => ({
  read,
});

export default readingListsRouter;
