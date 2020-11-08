import { connection } from ".."
import { Specialty } from "../types/ReturnData";

export const selectAllSpecialties = async (): Promise<Specialty[]> => {
  return await connection("specialty_labenu_system").select("*");
}