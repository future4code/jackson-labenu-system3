import { Request, Response } from "express"
import { inputData } from "../types/inputData";
import { formatDateStr, formatDateToDB } from "../functions/handleDate"
import { insertTeacher } from "../data/insertTeacher";
import { selectNonUniqueTeachers } from "../data/selectNonUniqueTeachers";
import { selectLast } from "../data/selectLast";

export const createTeacher = async (
  req: Request, res: Response
): Promise<void> => {
  try {
    const {id,name,email,birthdate} = req.body;

    if(!id || !name || !email || !birthdate){
      throw new Error("Missing data for requested operation");
    }

    const teachers = await selectNonUniqueTeachers(id, email);
    teachers.forEach(teacher => {
      if(teacher.id === id){
        res.statusCode = 406;
        throw new Error("'id' already registered");
      }
      if(teacher.email === email){
        res.statusCode = 406;
        throw new Error("'email' already registered");
      }
    });
    
    const data: inputData = {id,name,email,birthdate}

    data.birthdate = formatDateToDB(birthdate);

    await insertTeacher(data);

    const lastTeacher = await selectLast("teacher_labenu_system");

    res.status(201).send({
      message: "Success creating teacher",
      student: {
        ...lastTeacher, 
        birthdate: formatDateStr(lastTeacher.birthdate)
      }
    });
  } catch (err) {
    res.status(res.statusCode).send({message: err.message || err.sqlMessage});
  }
}