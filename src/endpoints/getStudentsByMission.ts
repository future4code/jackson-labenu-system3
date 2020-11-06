import { query, Request, Response } from 'express';
import { selectAllStudentsForMission } from '../data/selectAllStudentsForMission';
import { selectMission } from '../data/selectMission';
import { formatDateStr } from '../functions/handleDate';

export const getStudentsByMission = async (req: Request, res: Response) => {
  try {

    const name = req.query.name as string

    if(name !== "Newton" && 
       name !== "Bouman" &&
       name !== "Sagan" &&
       name !== "Hamilton" &&
       name !== "Julian" &&
       name !== "Mello" &&
       name !== "Turing" &&
       name !== "Jackson" &&
       name !== "Tang" &&
       name !== "Dumont" &&
       name !== "Muyembe") {

      throw new Error('Você deve inserir um valor válido de turmas já existentes')
    }

    const result = await selectAllStudentsForMission(name)

    if(!result.length) {
      res.statusCode = 404;
      throw new Error('Nenhuma aluno encontrado')
    }

    const mission = await selectMission("mission_labenu_system", name);

    res.status(200).send({
        message: `estudantes da turma..${mission.name}`,
        students: {
            result,
          }
        });

    }catch(error) {
    res.status(400).send(
      {
        message: error.message || error.sqlMessege
      }
    )
  }
}