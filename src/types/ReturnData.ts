export type Student = {
  id: number,
  name: string,
  email: string,
  birthdate: Date,
  hobbies: string[],
  missionId: number
}

export type Teacher = {
  id: number,
  name: string,
  email: string,
  birthdate: Date,
  specialties: string[],
  missionId: number
}

export type Mission = {
  id: number,
  name: string,
  startDate: Date,
  endDate: Date,
  module: number
} 

export type Hobby = {
  id: number,
  name: string
}

export type Specialty = {
  id: number,
  name: string
}