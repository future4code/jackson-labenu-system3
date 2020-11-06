import { connection } from "..";

export const selectAllTeachersForMission
    = async (name: string): Promise<any[]> => {

    const result = await connection.raw(`
        SELECT te.id AS id, te.name AS name, email, birthdate
        FROM mission_labenu_system AS mi
        JOIN teacher_labenu_system AS te
        ON mission_id = mi.id
        WHERE mi.name = "${name}";
    `)

    return result[0]
}
