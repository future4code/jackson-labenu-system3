import { Request, Response } from 'express';

import { Teacher } from '../types/ReturnData';

import { formatDateStr } from '../functions/handleDate';
import { selectAllSpecialties } from '../data/selectAllSpecialties';
import { selectAllTeachersBySpecialty } from '../data/selectAllTeachersBySpecialty';

export const getTeachersBySpecialty = async (
  req: Request, res: Response
): Promise<void> => {

  res.statusCode = 400;

  try {
    const name = req.query.name as string
    const specialties = (await selectAllSpecialties()).map(specialty => (specialty.name))

    if(!specialties.includes(name)){
      throw new Error('Please enter a listed specialty')
    }

    const teachers: Teacher[] = await selectAllTeachersBySpecialty(name)

    if(!teachers.length) {
      res.statusCode = 404;
      throw new Error('No teachers found');
    }

    res.status(200).send({
      specialty: `${name}`,
      teachers: teachers.map(teacher=>(
        {...teacher, birthdate: formatDateStr(teacher.birthdate)}
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