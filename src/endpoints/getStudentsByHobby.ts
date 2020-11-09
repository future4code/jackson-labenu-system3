import { Request, Response } from 'express';

import { Student } from '../types/ReturnData';

import { formatDateStr } from '../functions/handleDate';
import { selectAllHobbies } from '../data/selectAllHobbies';
import { selectAllStudentsByHobby } from '../data/selectAllStudentsByHobby';

export const getStudentsByHobby = async (
  req: Request, res: Response
): Promise<void> => {

  res.statusCode = 400;

  try {
    const name = req.query.name as string
    const hobbies = (await selectAllHobbies()).map(hobby => (hobby.name))

    if(!hobbies.includes(name)){
      throw new Error('Please enter a listed hobby')
    }

    const students: Student[] = await selectAllStudentsByHobby(name)

    if(!students.length) {
      res.statusCode = 404;
      throw new Error('No students found');
    }

    res.status(200).send({
      hobby: `${name}`,
      students: students.map(student=>(
        {...student, birthdate: formatDateStr(student.birthdate)}
      ))
    });
    } catch(err) {
    res.status(res.statusCode).send(
      {
        message: err.message || err.sqlMessege
      }
    )
  }
}