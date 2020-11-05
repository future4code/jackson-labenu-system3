import { connection } from ".."

export const selectMissionById = async (
  id: number 
): Promise<any[]> => {
  return await connection("mission_labenu_system")
    .select("*")
    .where("id", id)
;
}