import express from "express";
const router = express.Router();
export default router;

import { getFolderByID, getFolders } from "#db/queries/folders";
import { createFile } from "#db/queries/files";

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

router.get("/:id", async (req, res) => {
  res.send(req.folder);
});

// router post folders/:id/files
// have no idea where the problem is
// tried copying code over and it broke all functions
router.post("/:id/files", async (req, res) => {
  if (!req.body) return res.status(400).send("Request must have a body");

  const { name, size } = req.body;
  if (!name || !size)
    return res.status(400).send("Request body must have: name, size");

  const file = await createFile(name, size, req);
  res.status(201).send(file);
});
