import { connection } from "..";

export const deleteStudent = async (id: number): Promise<void> => {
    await connection ("student_labenu_system")
      .where ('id', id)
      .del()
  }