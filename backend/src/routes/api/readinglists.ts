import { Router } from "express";
import { Attributes } from "sequelize/types";
import { currentUserFromToken, tokenExtractor } from "../../middlewares";
import { ReadingList } from "../../models";

const readingListsRouter = Router();

readingListsRouter.post("/", async (req, res) => {
  const params = permittedPostAttributes(req.body as Attributes<ReadingList>);
  const readingList = await ReadingList.create({ ...params });
  res.json(readingList);
});

readingListsRouter.put(
  "/:id",
  tokenExtractor,
  currentUserFromToken,
  async (req, res) => {
    const readingList = await ReadingList.findByPk(req.params.id);
    if (!readingList) {
      return res.status(404).end();
    }
    if (readingList.userId !== req.currentUser.id) {
      return res.status(403).end();
    }
    const params = permittedPutAttributes(req.body as Attributes<ReadingList>);
    await readingList.update(params);
    res.json(readingList);
  }
);

type PermittedPostAttributes = Pick<
  Attributes<ReadingList>,
  "userId" | "blogId"
>;

type PermittedPutAttributes = Pick<ReadingList, "read">;

const permittedPostAttributes = ({
  userId,
  blogId,
}: Attributes<ReadingList>): PermittedPostAttributes => ({
  userId,
  blogId,
});

const permittedPutAttributes = ({
  read,
}: Attributes<ReadingList>): PermittedPutAttributes => ({
  read,
});

export default readingListsRouter;
