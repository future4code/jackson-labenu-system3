import { connection } from ".."
import { Hobby } from "../types/ReturnData";

export const selectAllHobbies = async (): Promise<Hobby[]> => {
  return await connection("hobby_labenu_system").select("*");
}