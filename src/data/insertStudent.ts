import { connection } from "..";
import { inputData } from "../types/inputData";

export const insertStudent = async (data: inputData): Promise<void> => {
  const {id,name,email,birthdate} = data;
  await connection ("student_labenu_system")
    .insert({id,name,email,birthdate})
}