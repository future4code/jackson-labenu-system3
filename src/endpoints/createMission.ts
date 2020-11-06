import { Request, Response } from "express"
import { inputMission } from "../types/InputData";
import { formatDateStr, formatDateToDB } from "../functions/handleDate"
import { insertMission } from "../data/insertMission";
import { selectLastMission } from "../data/selectLastMission";
import { selectNonUniqueMission } from "../data/selectNonUniqueMission";

export const createMission = async (
  req: Request, res: Response
): Promise<void> => {
  try {

    console.log(req.body)
    const {id,name,start_date,end_date, module} = req.body;

    if(!id || !name || !start_date || !end_date || !module){
      throw new Error("Missing data for requested operation");
    }
    console.log(req.body)

    const missions = await selectNonUniqueMission(id, name);
    missions.forEach(mission => {
      if(mission.id === id){
        res.statusCode = 406;
        throw new Error("'id' already registered");
      }
      if(mission.name === name){
        res.statusCode = 406;
        throw new Error("'name' already registered");
      }
    });
    
    const data: inputMission = {id,name,start_date,end_date, module}

    data.start_date = formatDateToDB(start_date);
    data.end_date = formatDateToDB(end_date);

    await insertMission(data);

    const lastMission = await selectLastMission("mission_labenu_system");

    res.status(201).send({
      message: "Success creating mission",
      mission: {
        ...lastMission, 
        startDate: formatDateStr(lastMission.start_date),
        endDate: formatDateStr(lastMission.end_date),
      }
    });
  } catch (err) {
    res.status(400).send({message: err.message || err.sqlMessage});
  }
}