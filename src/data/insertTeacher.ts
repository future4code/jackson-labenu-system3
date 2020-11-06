import { connection } from "..";
import { inputData } from "../types/InputData";

export const insertTeacher = async (data: inputData): Promise<void> => {
  const {id,name,email,birthdate} = data;
  await connection ("teacher_labenu_system")
    .insert({id,name,email,birthdate});
}