import { connection } from "..";
import { Teacher } from "../types/ReturnData";

export const selectAllTeachersBySpecialty
    = async (name: string): Promise<Teacher[]> => {

    return await connection("teacher_specialty_labenu_system as sh")
        .join("specialty_labenu_system as h", "sh.specialty_id", "h.id")
        .join("teacher_labenu_system as s", "sh.teacher_id", "s.id")
        .select("s.id", "s.name", "s.email", "s.birthdate")
        .where("h.name", name);
}
