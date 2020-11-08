import { connection } from "..";

export const insertTeacherSpecialty = async (
  teacher_id: number, specialty_id: number
): Promise<void> => {
  await connection ("teacher_specialty_labenu_system")
    .insert({teacher_id,specialty_id});
}