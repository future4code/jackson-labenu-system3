export type InputStudent = {
  id: number,
  name: string,
  email: string,
  birthdate: string
}

export type InputTeacher = {
  id: number,
  name: string,
  email: string,
  birthdate: string
}

export type InputMission = {
  id: number,
  name: string,
  startDate: string,
  endDate: string,
  module: number | undefined
}

export type StudentsByMission = {
  id: number,
  name: string,
  start_date: string,
  end_date: string,
  module: number,
  email: string,
  birthdate: string,
  mission_id: number
}