import { Request, Response } from "express"
import { InputTeacher } from "../types/InputData";
import { formatDateStr, formatDateToDB } from "../functions/handleDate"
import { insertTeacher } from "../data/insertTeacher";
import { selectTeachers } from "../data/selectTeachers";
import { Teacher } from "../types/ReturnData";

export const createTeacher = async (
  req: Request, res: Response
): Promise<void> => {
  try {
    const {id,name,email,birthdate} = req.body;

    if(!id || !name || !email || !birthdate){
      throw new Error("Missing data for requested operation");
    }

    const teachers: Teacher[] = await selectTeachers(id, email);
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
    
    const data: InputTeacher = {id,name,email,birthdate}

    data.birthdate = formatDateToDB(birthdate);

    await insertTeacher(data);

    const createdTeacher: Teacher = (await selectTeachers(id))[0];

    res.status(201).send({
      message: "Success creating teacher",
      teacher: {
        id: createdTeacher.id,
        name: createdTeacher.name,
        email: createdTeacher.email,
        birthdate: formatDateStr(createdTeacher.birthdate)
      }
    });
  } catch (err) {
    res.status(res.statusCode).send({message: err.message || err.sqlMessage});
  }
}