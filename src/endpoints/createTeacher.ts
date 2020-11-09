import { Request, Response } from "express"

import { Teacher, Specialty } from "../types/ReturnData";
import { InputTeacher } from "../types/InputData";

import { selectTeachers } from "../data/selectTeachers";
import { selectAllSpecialties } from "../data/selectAllSpecialties";
import { insertTeacher } from "../data/insertTeacher";
import { insertTeacherSpecialty } from "../data/insertTeacherSpecialty";
import { selectTeacherSpecialties } from "../data/selectTeacherSpecialties";

import { formatDateStr, formatDateToDB } from "../functions/handleDate"

export const createTeacher = async (
  req: Request, res: Response
): Promise<void> => {

  res.statusCode = 400;

  try {
    const {id,name,email,birthdate, specialties} = req.body;

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
    
    const data: InputTeacher = {id,name,email,birthdate, specialties}

    const specialtiesList: Specialty[] = await selectAllSpecialties();
    
    if(data.specialties.length > 0){
      data.specialties.forEach(specialty => {
        if(!specialtiesList.map(item=>item.name).includes(specialty)){
          res.statusCode = 406;
          throw new Error(`Specilty '${specialty}' not listed`)
        }
      });
    }

    data.birthdate = formatDateToDB(birthdate);

    await insertTeacher(data);

    data.specialties.forEach(async specialty => {
      const specialtyId: number = specialtiesList
        .filter(item => item.name === specialty)
        .map(item=>item.id)[0];

      await insertTeacherSpecialty(id, specialtyId)
    })

    const teacher: Teacher = (await selectTeachers(id))[0];

    teacher.specialties = 
      (await selectTeacherSpecialties(id)).map(item=>item.name);

    res.status(201).send({
      message: "Success creating teacher",
      teacher: {
        id, name, email, birthdate: formatDateStr(teacher.birthdate), specialties
      }
    });
  } catch (err) {
    res.status(res.statusCode).send({message: err.message || err.sqlMessage});
  }
}