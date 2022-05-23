import express from "express";
require("express-async-errors");
import { errorHandler } from "./middlewares";
import router from "./routes";
import { EnvironmentVariable } from "./types";
import config from "./utils/config";

const app = express();
app.use(express.json());
app.use(router);
app.use(errorHandler);

const PORT = config(EnvironmentVariable.PORT);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
