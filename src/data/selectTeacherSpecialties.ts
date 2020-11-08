import { connection } from "..";

export const selectTeacherSpecialties 
  = async (id: number): Promise<string[]> => (
  (
    await connection("teacher_specialty_labenu_system as ts")
      .join("specialty_labenu_system as s","ts.specialty_id","s.id")
      .select("s.name")
      .where("ts.teacher_id", id)
  ).map(item=>item.name)
)