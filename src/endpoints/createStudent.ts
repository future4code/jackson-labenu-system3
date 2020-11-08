import { Request, Response } from "express"

import { Hobby, Student } from "../types/ReturnData";
import { InputStudent } from "../types/InputData";

import { selectStudents } from "../data/selectStudents";
import { selectAllHobbies } from "../data/selectAllHobbies";
import { insertStudent } from "../data/insertStudent";
import { insertStudentHobby } from "../data/insertStudentHobby";
import { selectStudentHobbies } from "../data/selectStudentHobbies";

import { formatDateStr, formatDateToDB } from "../functions/handleDate";

export const createStudent = async (
  req: Request, res: Response
): Promise<void> => {
  
  res.statusCode = 400;

  try {
    const {id,name,email,birthdate, hobbies} = req.body;

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
    
    const data: InputStudent = {id,name,email,birthdate, hobbies}

    const hobbiesList: Hobby[] = await selectAllHobbies();

    if(data.hobbies.length > 0){
      data.hobbies.forEach(hobby => {
        if(!hobbiesList.map(item=>item.name).includes(hobby)){
          res.statusCode = 406;
          throw new Error(`Hobby '${hobby}' not listed`)
        }
      });
    }

    data.birthdate = formatDateToDB(birthdate);

    await insertStudent(data);

    data.hobbies.forEach(async hobby => {
      const hobbyId: number = hobbiesList
        .filter(item => item.name === hobby)
        .map(item=>item.id)[0];

      await insertStudentHobby(id, hobbyId);
    });

    const createdStudent: Student = (await selectStudents(id))[0];
    
    const studentHobbies: string[] = await selectStudentHobbies(id);

    res.status(201).send({
      message: "Success creating student",
      student: {
        id: createdStudent.id,
        name: createdStudent.name,
        email: createdStudent.email,
        birthdate: formatDateStr(createdStudent.birthdate),
        hobbies: studentHobbies
      }
    });
  } catch (err) {
    res.status(res.statusCode).send({message: err.message || err.sqlMessage});
  }
}