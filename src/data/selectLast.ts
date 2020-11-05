import { connection } from ".."

export const selectLast = async(db: string): Promise<any> => (
  await connection(db)
    .select("id","name","email","birthdate")
    .orderBy("id", "desc")
    .limit(1)
)[0];
