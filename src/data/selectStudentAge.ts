import { connection } from '../index'

export async function selectStudentAge(
    id: number
): Promise<any> {
    try {
        const result = await connection("student_labenu_system")
            .select("birthdate")
            .where("id", id)

        console.log(result)
        return result

    } catch (error) {
        console.log(error)
    }
} 