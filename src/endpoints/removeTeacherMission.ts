import { Request, Response } from "express"
import { Mission, Teacher } from "../types/ReturnData"
import { selectTeachers } from "../data/selectTeachers"
import { selectMissions } from "../data/selectMissions"
import { updateTeacherMission } from "../data/updateTeacherMission"

export const removeTeacherMission = async(
    req: Request, res: Response  
): Promise<void> => {

    try {
        const teacherId: number = Number(req.params.id)

        const teacher: Teacher = (await selectTeachers(teacherId))[0]

        if(!teacher){
            res.statusCode = 404
            throw new Error ('Teacher not found')
        }

        if(!teacher.missionId){
            res.statusCode = 406;
            throw new Error("Teacher not assigned to any mission")
        }
        
        await updateTeacherMission(teacherId,null)
        
        const mission: Mission = (await selectMissions(teacher.missionId))[0]

        res.status(200).send({
            message: `${teacher.name} removed from mission ${mission.name}`
        })
    } catch (err) {
        res.status(res.statusCode).send({
            message: err.message || err.sqlMessage
        })
    }
}