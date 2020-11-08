import { Request, Response } from "express"
import { Mission, Student } from "../types/ReturnData"
import { selectStudents } from "../data/selectStudents"
import { selectMissions } from "../data/selectMissions"
import { updateStudentMission } from "../data/updateStudentMission"

export const changeStudentMission = async(
    req: Request, res: Response  
): Promise<void> => {

    try {
        const {studentId, missionId} = req.body

        if(!studentId || !missionId){
            throw new Error("Missing data for requested operation");
        }
        
        const student: Student = (await selectStudents(studentId))[0]

        if(!student){
            res.statusCode = 404
            throw new Error ('Student not found')
        }
        
        const mission: Mission = (await selectMissions(missionId))[0]

        if(!mission){
            res.statusCode = 404
            throw new Error ('Mission not found')
        }

        if(student.missionId === missionId){
            res.statusCode = 406
            throw new Error(`${student.name} already on ${mission.name}`)
        }
        
        await updateStudentMission(studentId,missionId)
            
        res.status(200).send({
            message: 
                student.missionId 
                    ? `${student.name} changed to ${mission.name}`
                    : `${student.name} added to ${mission.name}`
        })
    } catch (err) {
        res.status(res.statusCode).send({
            message: err.message || err.sqlMessage
        })
        
    }
}