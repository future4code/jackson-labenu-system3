import { connection } from "..";
import { InputTeacher } from "../types/InputData";

export const insertTeacher = async (data: InputTeacher): Promise<void> => {
  const {id,name,email,birthdate} = data;
  await connection ("teacher_labenu_system")
    .insert({id,name,email,birthdate});
}