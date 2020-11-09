import { connection } from "..";
import { Student } from "../types/ReturnData";

export const selectAllStudentsByHobby
    = async (name: string): Promise<Student[]> => {

    return await connection("student_hobby_labenu_system as sh")
        .join("hobby_labenu_system as h", "sh.hobby_id", "h.id")
        .join("student_labenu_system as s", "sh.student_id", "s.id")
        .select("s.id", "s.name", "s.email", "s.birthdate")
        .where("h.name", name);
}
