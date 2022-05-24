import { Router } from "express";
import usersRouter from "./users";
import sessionRouter from "./session";
import blogsRouter from "./blogs";
import authorsRouter from "./authors";

const apiRouter = Router();

apiRouter.use("/users", usersRouter);
apiRouter.use("/session", sessionRouter);
apiRouter.use("/blogs", blogsRouter);
apiRouter.use("/authors", authorsRouter);

export default apiRouter;
