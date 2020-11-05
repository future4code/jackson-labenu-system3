import { connection } from ".."

export const selectNonUniqueStudents = async (
  id: number, email: string | null = null
): Promise<any[]> => {
  return await connection("student_labenu_system")
    .select("*")
    .where("id", id)
    .orWhere("email", email);
}