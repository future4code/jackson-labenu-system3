export type Student = {
  id: number,
  name: string,
  email: string,
  birthdate: Date,
  missionId: number
}

export type Teacher = {
  id: number,
  name: string,
  email: string,
  birthdate: Date,
  missionId: number
}

export type Mission = {
  id: number,
  name: string,
  startDate: Date,
  endDate: Date,
  module: number
} 