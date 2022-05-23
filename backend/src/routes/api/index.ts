import { Router } from "express";
import usersRouter from "./users";
import sessionRouter from "./session";
import blogsRouter from "./blogs";

const apiRouter = Router();

apiRouter.use("/users", usersRouter);
apiRouter.use("/session", sessionRouter);
apiRouter.use("/blogs", blogsRouter);

export default apiRouter;
