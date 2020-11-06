import { Request, Response } from "express"
import { selectNonUniqueStudents } from "../data/selectNonUniqueStudents";
import { removeStudent } from "../data/removeStudent";

export const deleteStudent = async (
    req: Request, res: Response
): Promise<any> => {
    try {
        const id = Number(req.params.id);

        const student = (await (selectNonUniqueStudents(id)))[0];
        console.log(student)

        if(!student) {
            res.statusCode = 400;
            throw new Error("'id' not registered");
        }

        await removeStudent(id)

        res.status(200).send({ message: `Student was successfully removed.`});
        
    } catch (err) {
        res.status(400).send({ message: err.message || err.sqlMessage });
    }
}