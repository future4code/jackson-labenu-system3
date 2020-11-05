import { connection } from "..";

export const updateStudentMission = async (studentId: number , missionId: number): Promise<void> => {
    await connection ("student_labenu_system")
      .update('mission_id', missionId)
      .where ('id',studentId)
  }