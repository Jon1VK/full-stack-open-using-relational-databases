import { Router } from "express";
import usersRouter from "./users";
import sessionRouter from "./session";
import blogsRouter from "./blogs";
import authorsRouter from "./authors";
import readingListsRouter from "./readinglists";

const apiRouter = Router();

apiRouter.use("/users", usersRouter);
apiRouter.use("/session", sessionRouter);
apiRouter.use("/blogs", blogsRouter);
apiRouter.use("/authors", authorsRouter);
apiRouter.use("/readinglists", readingListsRouter);

export default apiRouter;
