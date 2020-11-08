import { connection } from "..";

export const selectStudentHobbies = async (id: number): Promise<string[]> => (
  (
    await connection("student_hobby_labenu_system as sh")
      .join("hobby_labenu_system as h","sh.hobby_id","h.id")
      .select("h.name")
      .where("sh.student_id", id)
  ).map(item=>item.name)
)