import { connection } from "..";

export const deleteStudentHobbiesRelation = 
  async (id: number): Promise<void> => {
    await connection ("student_hobby_labenu_system")
      .where ('id', id)
      .del()
  }