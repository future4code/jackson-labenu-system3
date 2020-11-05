import { connection } from ".."

export const selectNonUniqueTeachers = async (
  id: number, email: string
): Promise<any[]> => {
  return await connection("teacher_labenu_system")
    .select("*")
    .where("id", id)
    .orWhere("email", email);
}