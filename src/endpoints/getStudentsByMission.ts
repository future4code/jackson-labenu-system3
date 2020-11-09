import { Request, Response } from 'express';

import { Student } from '../types/ReturnData';

import { selectAllMissions } from '../data/selectAllMissions';
import { selectAllStudentsForMission } from '../data/selectAllStudentsForMission';

import { formatDateStr } from '../functions/handleDate';

export const getStudentsByMission = async (
  req: Request, res: Response
): Promise<void> => {

  res.statusCode = 400;

  try {
    const name = req.query.name as string
    const missions = (await selectAllMissions()).map(mission => (mission.name))

    if(!missions.includes(name)){
      throw new Error('Please enter an existing mission')
    }

    const students: Student[] = await selectAllStudentsForMission(name)

    if(!students.length) {
      res.statusCode = 404;
      throw new Error('No students found');
    }

    res.status(200).send({
      message: `Students of mission..${name}`,
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