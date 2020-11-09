import { connection } from "..";

export const deleteTeacherSpecialty = async (
  teacher_id: number, specialty_id: number
): Promise<void> => {
  await connection ("teacher_specialty_labenu_system")
    .where({teacher_id}).andWhere({specialty_id}).del();
}