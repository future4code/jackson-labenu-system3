import { Request, Response } from "express"
import { selectMissionById } from "../data/selectMissionById"
import { selectNonUniqueStudents } from "../data/selectNonUniqueStudents"
import { updateStudentMission } from "../data/updateStudentMission"


export const addStudenttoMission = async(
    req: Request, res: Response

  
): Promise<void> => {

    try {

        const {studentId, missionId} = req.body
        const student = await selectNonUniqueStudents(studentId)

        if(
            !student
        ){
            res.statusCode = 404
            throw new Error ('student not found')
        }
        
        const mission = selectMissionById(missionId)

        if(
            !mission
        ){
            res.statusCode = 404
            throw new Error ('mission not found')
        }
            await updateStudentMission(studentId,missionId)
            
            res.status(200).send({
                mensage: 'sucess'})

    } catch (error) {
        res.status(400).send(error.message)
        
    }
}