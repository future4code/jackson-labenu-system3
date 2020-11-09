import { Request, Response } from "express"
import { selectStudents } from "../data/selectStudents";
import { deleteStudent } from "../data/deleteStudent";
import { Student } from "../types/ReturnData";
import { deleteStudentHobbiesRelation } from "../data/deleteStudentHobbiesRelation";

export const removeStudent = async (
    req: Request, res: Response
): Promise<void> => {
    try {
        const id: number = Number(req.params.id);

        const student: Student = (await (selectStudents(id)))[0];

        if(!student) {
            res.statusCode = 404;
            throw new Error("Student not found");
        }

        await deleteStudentHobbiesRelation(id);

        await deleteStudent(id);

        res.status(200).send({ message: `Student was successfully removed.`});
        
    } catch (err) {
        res.status(res.statusCode).send({ message: err.message || err.sqlMessage });
    }
}