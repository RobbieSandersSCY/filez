import express from "express";
const app = express();
export default app;

import folderRouter from "./api/folders.js";
import fileRouter from "./api/files.js";

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Filez API");
});

app.use("/files", fileRouter);

app.use("/folders", folderRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong :(");
});
