import { connection } from "..";
import { InputMission } from "../types/InputData";

export const insertMission = async (data: InputMission): Promise<void> => {
  const {id,name,startDate,endDate,module} = data;
  await connection ("mission_labenu_system")
    .insert({
      id,
      name,
      start_date: startDate,
      end_date: endDate,
      module: module || 0
    });
}