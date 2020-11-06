import { connection } from ".."

export const selectAllMissions = async (): Promise<any[]> => {
  return await connection("mission_labenu_system").select("*");
}