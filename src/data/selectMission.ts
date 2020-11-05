import { connection } from ".."

export const selectMission = async (db: string, name: string): Promise<any> => {
  return (
    await connection(db)
      .select("id","name","start_date","end_date", "module")
      .where("name", `${name}`)
      .limit(1)
  )[0];
}