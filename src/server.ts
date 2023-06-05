import express, { ErrorRequestHandler } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import petSitterRouter from "./petsitter.js";
import { defaultErrorHandler } from "./utils.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/petsitter", petSitterRouter);

app.get("/Hi/:n", async (req, res, next) => {
  const { n } = req.params;
  if (n === "42") {
    res.status(200).json({ hi: true });
  } else {
    next("error 42");
  }
});

app.use(((err, req, res, next) => {
  console.error("Soy un intermediario ", err);
  next(err);
}) as ErrorRequestHandler);

app.use(defaultErrorHandler);

const { SERVER_PORT } = process.env;
app.listen(SERVER_PORT, () => {
  console.log(`Dog Sitter API listening on: ${SERVER_PORT}`);
});
