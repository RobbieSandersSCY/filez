import express from "express";
const router = express.Router();
export default router;

import { getFolders } from "#db/queries/folders";

router.get("/", async (req, res) => {
  const folders = await getFolders();
  res.send(folders);
});
