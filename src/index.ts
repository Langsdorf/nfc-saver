import express from "express";
import bodyParser from "body-parser";
import generateRoutes from "./core/router";
import { log } from "./core/logging";
import chalk from "chalk";

const init = async () => {
  const app = express();
  app.use(bodyParser.json());

  await generateRoutes(app);

  app.all("*", (req: express.Request, res: express.Response) => {
    res.status(404).json({
      statusCode: 404,
      message: `${req.path} not found`,
    });
  });

  app.listen(process.env.PORT || 3002, () => {
    log(
      `${chalk.cyan("Server started on port")} ${chalk.redBright(
        process.env.PORT || 3002
      )}`
    );
  });
};

init();
