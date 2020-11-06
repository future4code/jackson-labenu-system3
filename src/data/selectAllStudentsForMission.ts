import { connection } from "..";
import { StudentsByMission } from "../types/inputData";


export const selectAllStudentsForMission = async (name: string): Promise<StudentsByMission[]> => {

    const result = await connection.raw(`
    SELECT * FROM mission_labenu_system AS mi
    JOIN student_labenu_system
    ON mission_id = mi.id
    WHERE mi.name LIKE "%${name}%";
    `)

    return result[0]
}
