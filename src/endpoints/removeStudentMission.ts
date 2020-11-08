import { Request, Response } from "express"
import { Mission, Student } from "../types/ReturnData"
import { selectStudents } from "../data/selectStudents"
import { selectMissions } from "../data/selectMissions"
import { updateStudentMission } from "../data/updateStudentMission"

export const removeStudentMission = async(
    req: Request, res: Response  
): Promise<void> => {

    try {
        const studentId: number = Number(req.params.id)

        const student: Student = (await selectStudents(studentId))[0]

        if(!student){
            res.statusCode = 404
            throw new Error ('Student not found')
        }

        if(!student.missionId){
            res.statusCode = 406;
            throw new Error("Student not assigned to any mission")
        }
        
        await updateStudentMission(studentId,null)
        
        const mission: Mission = (await selectMissions(student.missionId))[0]

        res.status(200).send({
            message: `${student.name} removed from mission ${mission.name}`
        })
    } catch (err) {
        res.status(res.statusCode).send({
            message: err.message || err.sqlMessage
        })
    }
}