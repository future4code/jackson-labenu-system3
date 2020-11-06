import { Request, Response } from "express"
import { Student } from "../types/ReturnData";
import { selectStudents } from "../data/selectStudents";
import { getAge } from "../functions/handleDate";

export const getStudentAge = async (
    req: Request, res: Response
): Promise<void> => {
    try {
        const id: number = Number(req.params.id);

        const student: Student = (await (selectStudents(id)))[0];

        if(!student) {
            throw new Error("'id' not registered");
        }

        const age: number = getAge(student.birthdate);

        res.status(200).send({ message: `${student.name}: ${age} years old`});
    } catch (err) {
        res.status(res.statusCode).send({ message: err.message || err.sqlMessage });
    }
}