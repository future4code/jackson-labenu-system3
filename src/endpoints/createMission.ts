import { Request, Response } from "express"
import { Mission } from "../types/ReturnData";
import { InputMission } from "../types/InputData";
import { selectMissions } from "../data/selectMissions";
import { insertMission } from "../data/insertMission";
import { formatDateStr, formatDateToDB } from "../functions/handleDate"

export const createMission = async (
  req: Request, res: Response
): Promise<void> => {
  try {
    const {id,name,startDate,endDate, module} = req.body;

    if(!id || !name || !startDate || !endDate){
      throw new Error("Missing data for requested operation");
    }

    if(module && module > 7){
      res.statusCode = 406;
      throw new Error("Invalid module value");
    }

    const missions: Mission[] = await selectMissions(id, name);
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
    
    const data: InputMission = {id,name,startDate,endDate,module}

    data.startDate = formatDateToDB(startDate);
    data.endDate = formatDateToDB(endDate);

    await insertMission(data);

    const createdMission: Mission = (await selectMissions(id))[0];

    res.status(201).send({
      message: "Success creating mission",
      mission: {
        ...createdMission, 
        startDate: formatDateStr(createdMission.startDate),
        endDate: formatDateStr(createdMission.endDate),
        module: createdMission.module || "Classes haven't started yet"
      }
    });
  } catch (err) {
    res.status(res.statusCode).send({message: err.message || err.sqlMessage});
  }
}