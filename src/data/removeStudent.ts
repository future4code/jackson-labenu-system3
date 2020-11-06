import { connection } from "..";

export const removeStudent = async (id: number): Promise<void> => {
    await connection ("student_labenu_system")
      .where ('id', id)
      .del()
  }