import { connection } from "..";

export const insertStudentHobby = async (
  student_id: number, hobby_id: number
): Promise<void> => {
  await connection ("student_hobby_labenu_system")
    .insert({student_id,hobby_id});
}