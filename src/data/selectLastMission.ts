import { connection } from ".."

export const selectLastMission = async (db: string): Promise<any> => {
  return (
    await connection(db)
      .select("id","name","start_date","end_date", "module")
      .orderBy("id", "desc")
      .limit(1)
  )[0];
}
