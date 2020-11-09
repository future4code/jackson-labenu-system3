import { connection } from "..";
import { Hobby } from "../types/ReturnData";

export const selectStudentHobbies = async (id: number): Promise<Hobby[]> => (
  (
    await connection("student_hobby_labenu_system as sh")
      .join("hobby_labenu_system as h","sh.hobby_id","h.id")
      .select("h.id", "h.name")
      .where("sh.student_id", id)
  )
)