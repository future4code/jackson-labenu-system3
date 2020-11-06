import { Request, Response } from "express"
import { selectNonUniqueMission } from "../data/selectNonUniqueMission"
import { selectNonUniqueStudents } from "../data/selectStudents"
import { updateStudentMission } from "../data/updateStudentMission"


export const addStudentToMission = async(
    req: Request, res: Response  
): Promise<void> => {

    try {
        const {studentId, missionId} = req.body

        if(!studentId || !missionId){
            throw new Error("Missing data for requested operation");
          }
        
        const student = (await selectNonUniqueStudents(studentId))[0]

        if(!student){
            res.statusCode = 404
            throw new Error ('Student not found')
        }
        
        const mission = (await selectNonUniqueMission(missionId))[0]

        if(!mission){
            res.statusCode = 404
            throw new Error ('Mission not found')
        }

        if(student.mission_id === missionId){
            res.statusCode = 406
            throw new Error(`${student.name} already on ${mission.name}`)
        }
        
        await updateStudentMission(studentId,missionId)
            
        res.status(200).send({
            message: 
                student.mission_id 
                    ? `${student.name} changed to ${mission.name}`
                    : `${student.name} added to ${mission.name}`
        })
    } catch (err) {
        res.status(res.statusCode).send({
            message: err.message || err.sqlMessage
        })
        
    }
}