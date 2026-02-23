import db from "#db/client";
import { createFolder, createFile } from "./queries/folders.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  await seedFolder();
  await seedFile();
}

async function seedFolder() {
  for (let folderCount = 1; folderCount <= 3; folderCount++) {
    const folder = {
      name: "folder_" + folderCount,
    };
    await createFolder(folder);
  }
}

async function seedFile() {
  for (let folder = 1; folder <= 3; folder++) {
    for (let fileCount = 1; fileCount <= 5; fileCount++) {
      const file = {
        name: "file_" + fileCount,
        size: Math.floor(Math.random() * 1000),
        folder_id: folder,
      };
      await createFile(file);
    }
  }
}
