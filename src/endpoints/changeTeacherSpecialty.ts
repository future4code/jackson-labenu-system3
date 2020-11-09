import { Request, Response } from "express";

import { Specialty, Teacher } from "../types/ReturnData";

import { deleteTeacherSpecialty } from "../data/deleteTeacherSpecialty";
import { insertTeacherSpecialty } from "../data/insertTeacherSpecialty";
import { selectAllSpecialties } from "../data/selectAllSpecialties";
import { selectTeacherSpecialties } from "../data/selectTeacherSpecialties";
import { selectTeachers } from "../data/selectTeachers";

export const changeTeacherSpecialty = async (
  req: Request, res: Response
): Promise<void> => {
  
  res.statusCode = 400;

  try {
    const id: number = Number(req.params.id);
    const specialties: string[] = req.body.specialties;

    if(!id || !specialties.length){
      throw new Error("Missing data for requested operation");
    }

    const specialtiesList: Specialty[] = await selectAllSpecialties();

    specialties.forEach(specialty => {
      if(!specialtiesList.map(item=>item.name).includes(specialty)){
        res.statusCode = 406;
        throw new Error(`Specialty '${specialty}' not listed`)
      }
    });

    const teacherSpecialties: Specialty[] = await selectTeacherSpecialties(id);

    const specialtiesToAdd: string[] = specialties
      .filter(specialty=>!teacherSpecialties.map(item=>item.name).includes(specialty));

    const specialtiesToRemove: string[] = specialties
      .filter(specialty=>teacherSpecialties.map(item=>item.name).includes(specialty));

    specialtiesToAdd.forEach(async specialty => {
      const specialtyId: number = specialtiesList
        .filter(item => item.name === specialty)
        .map(item=>item.id)[0];

      await insertTeacherSpecialty(id, specialtyId);
    })

    specialtiesToRemove.forEach(async specialty => {
      const specialtyId: number = specialtiesList
        .filter(item => item.name === specialty)
        .map(item=>item.id)[0];

      await deleteTeacherSpecialty(id, specialtyId);
    })

    const teacher: Teacher = (await selectTeachers(id))[0];
    
    res.status(200).send({
      message: `Teacher ${teacher.name} specialties:`,
      added: specialtiesToAdd,
      removed: specialtiesToRemove
    })
  } catch (err) {
    res.status(res.statusCode).send({
      message: err.message || err.sqlMessage
    })
  }
}