import { connection } from "..";
import { InputStudent } from "../types/InputData";

export const insertStudent = async (data: InputStudent): Promise<void> => {
  const {id,name,email,birthdate} = data;
  await connection ("student_labenu_system")
    .insert({id,name,email,birthdate});
}