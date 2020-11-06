export type inputData = {
  id: number,
  name: string,
  email: string,
  birthdate: string
}

export type inputMission = {
  id: number,
  name: string,
  start_date: string,
  end_date: string,
  module: number
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