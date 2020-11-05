import { Request, Response } from "express"
import { insertStudent } from "../data/insertStudent";
import { selectNonUniqueStudents } from "../data/selectNonUniqueStudents";
import { inputData } from "../types/inputData";
import { formatDateStr, formatDateToDB } from "../aux/handleDate"
import { selectLast } from "../data/selectLast";

export const createStudent = async (
  req: Request, res: Response
): Promise<void> => {
  try {
    const {id,name,email,birthdate} = req.body;

    if(!id || !name || !email || !birthdate){
      throw new Error("Missing data for requested operation");
    }

    const students = await selectNonUniqueStudents(id, email);
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
    
    const data: inputData = {id,name,email,birthdate}

    data.birthdate = formatDateToDB(birthdate);

    await insertStudent(data);

    const lastStudent = await selectLast("student_labenu_system");

    res.status(201).send({
      message: "Success creating student",
      student: {
        ...lastStudent, 
        birthdate: formatDateStr(lastStudent.birthdate)
      }
    });
  } catch (err) {
    res.status(400).send({message: err.message || err.sqlMessage});
  }
}