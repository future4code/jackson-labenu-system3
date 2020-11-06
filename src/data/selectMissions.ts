import { connection } from ".."
import { Mission } from "../types/ReturnData";

export const selectMissions = async (
  id: number, name: string | null = null
): Promise<Mission[]> => {
  return await connection("mission_labenu_system").select(
      "id", "name", "start_date as startDate", "end_date as endDate", "module"
    ).where("id", id).orWhere("name", name);
}