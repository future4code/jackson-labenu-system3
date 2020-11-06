import { connection } from ".."
import { Student } from "../types/ReturnData";

export const selectStudents = async (
  id: number, email: string | null = null
): Promise<Student[]> => {
  return await connection("student_labenu_system")
    .select("id", "name", "email", "birthdate", "mission_id AS missionId")
    .where("id", id)
    .orWhere("email", email);
}