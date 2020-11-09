import { connection } from "..";

export const deleteStudentHobby = async (
  student_id: number, hobby_id: number
): Promise<void> => {
  await connection ("student_hobby_labenu_system")
    .where({student_id}).andWhere({hobby_id}).del();
}