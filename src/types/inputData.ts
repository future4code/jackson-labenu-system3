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