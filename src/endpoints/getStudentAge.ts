import { Request, Response } from "express"
import { selectStudentAge } from "../data/selectStudentAge";
import { selectNonUniqueStudents } from "../data/selectNonUniqueStudents";

export const getStudentAge = async (
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

        const studentBirthdate = (await selectStudentAge(id))[0].birthdate;

        const date: Date = new Date(studentBirthdate)
        const ageInMilisseconds: number = Date.now() - date.getTime();
        const age: number = Math.floor(ageInMilisseconds / 1000 / 60 / 60 / 24 / 365);

        res.status(200).send({ message: `${student.name}: ${age} years`}); //ok
        // res.status(200).send(age); // gerando erro
    } catch (err) {
        res.status(400).send({ message: err.message || err.sqlMessage });
    }
}