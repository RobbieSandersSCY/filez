import express from "express";
const router = express.Router();
export default router;

import { getFolderByID, getFolders } from "#db/queries/folders";

router.get("/", async (req, res) => {
  const folders = await getFolders();
  res.send(folders);
});

router.param("id", async (req, res, next, id) => {
  const folder = await getFolderByID(id);
  if (!folder) return res.status(404).send("Folder does not exist.");

  req.folder = folder;
  next();
});

router.get("/:id", (req, res) => {
  res.send(req.folder);
});

// router post folders/:id/files
