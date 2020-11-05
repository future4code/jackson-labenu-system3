import { connection } from ".."

export const selectNonUniqueMission = async (
  id: number, name: string | null = null
): Promise<any[]> => {
  return await connection("mission_labenu_system")
    .select("*")
    .where("id", id)
    .orWhere("name", name);
}