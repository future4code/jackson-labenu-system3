import { connection } from ".."
import { Teacher } from "../types/ReturnData";

export const selectTeachers = async (
  id: number, email: string | null = null
): Promise<Teacher[]> => {
  return await connection("teacher_labenu_system")
    .select("id", "name", "email", "birthdate")
    .where("id", id)
    .orWhere("email", email);
}