import { Request, Response } from 'express';
import { selectAllMissions } from '../data/selectAllMissions';
import { selectAllStudentsForMission } from '../data/selectAllStudentsForMission';
import { formatDateStr } from '../functions/handleDate';

export const getStudentsByMission = async (req: Request, res: Response) => {
  try {

    const name = req.query.name as string
    const missions = (await selectAllMissions()).map(mission => (mission.name))

    if(!missions.includes(name)){
      throw new Error('Você deve inserir um valor válido de turmas já existentes')
    }

    const students = await selectAllStudentsForMission(name)

    if(!students.length) {
      res.statusCode = 404;
      throw new Error('Nenhum(a) aluno(a) encontrado(a)')
    }

    res.status(200).send({
      message: `Estudantes da turma..${name}`,
      students: students.map(student=>(
        {...student, birthdate: formatDateStr(student.birthdate)}
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