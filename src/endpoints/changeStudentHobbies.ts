import { Request, Response } from "express";

import { Hobby, Student } from "../types/ReturnData";

import { deleteStudentHobby } from "../data/deleteStudentHobby";
import { insertStudentHobby } from "../data/insertStudentHobby";
import { selectAllHobbies } from "../data/selectAllHobbies";
import { selectStudentHobbies } from "../data/selectStudentHobbies";
import { selectStudents } from "../data/selectStudents";

export const changeStudentHobbies = async (
  req: Request, res: Response
): Promise<void> => {
  
  res.statusCode = 400;

  try {
    const id: number = Number(req.params.id);
    const hobbies: string[] = req.body.hobbies;

    if(!id || !hobbies.length){
      throw new Error("Missing data for requested operation");
    }

    const hobbiesList: Hobby[] = await selectAllHobbies();

    hobbies.forEach(hobby => {
      if(!hobbiesList.map(item=>item.name).includes(hobby)){
        res.statusCode = 406;
        throw new Error(`Hobby '${hobby}' not listed`)
      }
    });

    const studentHobbies: Hobby[] = await selectStudentHobbies(id);

    const hobbiesToAdd: string[] = hobbies
      .filter(hobby=>!studentHobbies.map(item=>item.name).includes(hobby));

    const hobbiesToRemove: string[] = hobbies
      .filter(hobby=>studentHobbies.map(item=>item.name).includes(hobby));

    hobbiesToAdd.forEach(async hobby => {
      const hobbyId: number = hobbiesList
        .filter(item => item.name === hobby)
        .map(item=>item.id)[0];

      await insertStudentHobby(id, hobbyId);
    })

    hobbiesToRemove.forEach(async hobby => {
      const hobbyId: number = hobbiesList
        .filter(item => item.name === hobby)
        .map(item=>item.id)[0];

      await deleteStudentHobby(id, hobbyId);
    })

    const student: Student = (await selectStudents(id))[0];
    
    res.status(200).send({
      message: `Student ${student.name} hobbies:`,
      added: hobbiesToAdd,
      removed: hobbiesToRemove
    })
  } catch (err) {
    res.status(res.statusCode).send({
      message: err.message || err.sqlMessage
    })
  }
}