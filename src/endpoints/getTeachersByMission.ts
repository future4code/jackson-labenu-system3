import { Request, Response } from 'express';
import { Teacher } from '../types/ReturnData';
import { selectAllMissions } from '../data/selectAllMissions';
import { selectAllTeachersForMission } from '../data/selectAllTeachersForMission';
import { formatDateStr } from '../functions/handleDate';

export const getTeachersByMission = async (req: Request, res: Response) => {
  try {

    const name = req.query.name as string
    const missions = (await selectAllMissions()).map(mission => (mission.name))

    if(!missions.includes(name)){
      throw new Error('Please enter an existing mission')
    }

    const teachers: Teacher[] = await selectAllTeachersForMission(name)

    if(!teachers.length) {
      res.statusCode = 404;
      throw new Error('No teachers found')
    }

    res.status(200).send({
      message: `Teachers of mission..${name}`,
      teachers: teachers.map(teacher=>(
        {...teacher, birthdate: formatDateStr(teacher.birthdate)}
      ))
    });

    }catch(error) {
    res.status(res.statusCode).send(
      {
        message: error.message || error.sqlMessege
      }
    )
  }
}