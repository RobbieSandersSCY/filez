import db from "#db/client";

/**@returns the created folder according to provided details */
export async function createFolder({ name }) {
  const sql = `
  INSERT INTO folders (name)
  VALUES ($1)
  RETURNING *
  `;
  const {
    rows: [folder],
  } = await db.query(sql, [name]);
  return folder;
}

export async function getFolders() {
  const sql = `
    SELECT *
    FROM folders
  `;
  const { rows: folders } = await db.query(sql);
  return folders;
}

export async function getFolderByID(id) {
  const sql = `
    SELECT
      files.*,
      folders.name AS folder_name
    FROM
      files
      JOIN folders ON folders.id = files.folder_id
    WHERE folder_id = $1
  `;
  // backwards
  // const sql = `
  //   SELECT
  //     folders.*,
  //     files.name AS file_name
  //   FROM
  //     folders
  //     JOIN files ON files.folder_id = folders.id
  //   WHERE id = $1
  // `;
  const { rows: folder } = await db.query(sql, [id]);
  return [folder];
}
