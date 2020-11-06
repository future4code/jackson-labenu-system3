import { connection } from "..";

export const updateTeacherMission = async (
  teacherId: number , missionId: number | null
): Promise<void> => {
  await connection ("teacher_labenu_system")
    .update('mission_id', missionId).where ('id',teacherId)
}