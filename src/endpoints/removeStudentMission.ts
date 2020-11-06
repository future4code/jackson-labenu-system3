import { Request, Response } from "express"
import { Mission, Student } from "../types/ReturnData"
import { selectStudents } from "../data/selectStudents"
import { selectMissions } from "../data/selectMissions"
import { updateStudentMission } from "../data/updateStudentMission"

export const removeStudentMission = async(
    req: Request, res: Response  
): Promise<void> => {

    try {
        const {studentId, missionId} = req.body

        const student: Student = (await selectStudents(studentId))[0]

        if(!student){
            res.statusCode = 404
            throw new Error ('Student not found')
        }
        
        const mission: Mission = (await selectMissions(missionId))[0]

        if(!mission){
            await updateStudentMission(studentId,missionId)
            res.status(200).send({
                message: 
                        `${student.name} changed to mission ${mission}`
            })
        }
        if(mission) {
            res.statusCode = 404
            throw new Error ('expected value null for "missionId" ')
        }   
       
    } catch (err) {
        res.status(res.statusCode).send({
            message: err.message || err.sqlMessage
        })
        
    }
}