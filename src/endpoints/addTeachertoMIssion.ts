import { Request, Response } from "express"
import { Mission, Teacher } from "../types/ReturnData"
import { selectMissions } from "../data/selectMissions"
import { selectTeachers } from "../data/selectTeachers"
import { updateTeacherMission } from "../data/updateTeacherMission"


export const addTeacherToMission = async(
    req: Request, res: Response  
): Promise<void> => {

    try {
        const {teacherId, missionId} = req.body

        if(!teacherId || !missionId){
            throw new Error("Missing data for requested operation");
        }
        
        const teacher: Teacher = (await selectTeachers(teacherId))[0]

        if(!teacher){
            res.statusCode = 404
            throw new Error ('Teacher not found')
        }
        
        const mission: Mission = (await selectMissions(missionId))[0]

        if(!mission){
            res.statusCode = 404
            throw new Error ('Mission not found')
        }

        if(teacher.missionId === missionId){
            res.statusCode = 406
            throw new Error(`${teacher.name} already on ${mission.name}`)
        }
        
        await updateTeacherMission(teacherId,missionId)
            
        res.status(200).send({
            message: 
                teacher.missionId 
                    ? `${teacher.name} changed to ${mission.name}`
                    : `${teacher.name} added to ${mission.name}`
        })
    } catch (err) {
        res.status(res.statusCode).send({
            message: err.message || err.sqlMessage
        })
        
    }
}