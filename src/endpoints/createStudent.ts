import { Request, Response } from "express"
import { Student } from "../types/ReturnData";
import { InputStudent } from "../types/InputData";
import { selectStudents } from "../data/selectStudents";
import { insertStudent } from "../data/insertStudent";
import { formatDateStr, formatDateToDB } from "../functions/handleDate"

export const createStudent = async (
  req: Request, res: Response
): Promise<void> => {
  try {
    const {id,name,email,birthdate} = req.body;

    if(!id || !name || !email || !birthdate){
      throw new Error("Missing data for requested operation");
    }

    const students: Student[] = await selectStudents(id, email);
    students.forEach(student => {
      if(student.id === id){
        res.statusCode = 406;
        throw new Error("'id' already registered");
      }
      if(student.email === email){
        res.statusCode = 406;
        throw new Error("'email' already registered");
      }
    });
    
    const data: InputStudent = {id,name,email,birthdate}

    data.birthdate = formatDateToDB(birthdate);

    await insertStudent(data);

    const createdStudent: Student = (await selectStudents(id))[0];

    res.status(201).send({
      message: "Success creating student",
      student: {
        id: createdStudent.id,
        name: createdStudent.name,
        email: createdStudent.email,
        birthdate: formatDateStr(createdStudent.birthdate)
      }
    });
  } catch (err) {
    res.status(res.statusCode).send({message: err.message || err.sqlMessage});
  }
}