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
  // Outer SQL - pulls all folders matching given ID
  // inner SQL - returns an array of files in the matching folder ID named FILES
  const sql = `
    SELECT
      *,
      (
        SELECT json_agg(files)
        FROM files
        WHERE files.folder_id = folders.id
      ) as files
    FROM folders
    WHERE id = $1
  `;
  const {
    rows: [folder],
  } = await db.query(sql, [id]);
  return folder;

  // const sql = `
  //   SELECT
  //     files.*,
  //     folders.name AS folder_name
  //   FROM
  //     files
  //     JOIN folders ON folders.id = files.folder_id
  //   WHERE folder_id = $1
  // `;
  // const { rows: folder } = await db.query(sql, [id]);
  // return [folder];
}
