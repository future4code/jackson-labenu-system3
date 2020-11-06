import { Request, Response } from 'express';
import { selectAllMissions } from '../data/selectAllMissions';
import { selectAllTeachersForMission } from '../data/selectAllTeachersForMission';
import { formatDateStr } from '../functions/handleDate';

export const getTeachersByMission = async (req: Request, res: Response) => {
  try {

    const name = req.query.name as string
    const missions = (await selectAllMissions()).map(mission => (mission.name))

    if(!missions.includes(name)){
      throw new Error('Você deve inserir um valor válido de turmas já existentes')
    }

    const teachers = await selectAllTeachersForMission(name)

    if(!teachers.length) {
      res.statusCode = 404;
      throw new Error('Nenhum(a) aluno(a) encontrado(a)')
    }

    res.status(200).send({
      message: `Professores da turma..${name}`,
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