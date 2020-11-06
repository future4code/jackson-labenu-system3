import { connection } from "..";
import { inputMission } from "../types/InputData";

export const insertMission = async (data: inputMission): Promise<void> => {
  const {id,name,start_date,end_date, module} = data;
  await connection ("mission_labenu_system")
    .insert({id,name,start_date,end_date, module});
}