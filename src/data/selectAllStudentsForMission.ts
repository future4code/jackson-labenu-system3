import { connection } from "..";
import { Student } from "../types/ReturnData";

export const selectAllStudentsForMission
    = async (name: string): Promise<Student[]> => {

    const result = await connection.raw(`
        SELECT st.id AS id, st.name AS name, email, birthdate
        FROM mission_labenu_system AS mi
        JOIN student_labenu_system AS st
        ON mission_id = mi.id
        WHERE mi.name = "${name}";
    `)

    return result[0]
}
