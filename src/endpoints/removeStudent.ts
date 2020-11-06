import { Request, Response } from "express"
import { selectStudents } from "../data/selectStudents";
import { deleteStudent } from "../data/deleteStudent";
import { Student } from "../types/ReturnData";

export const removeStudent = async (
    req: Request, res: Response
): Promise<void> => {
    try {
        const id: number = Number(req.params.id);

        const student: Student = (await (selectStudents(id)))[0];

        if(!student) {
            res.statusCode = 400;
            throw new Error("'id' not registered");
        }

        await deleteStudent(id)

        res.status(200).send({ message: `Student was successfully removed.`});
        
    } catch (err) {
        res.status(400).send({ message: err.message || err.sqlMessage });
    }
}