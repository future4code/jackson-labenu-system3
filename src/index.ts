import express, { Express } from "express";
import knex from "knex";
import cors from "cors";
import dotenv from "dotenv";
import { AddressInfo } from "net";
import { createStudent } from "./endpoints/createStudent";
import { createTeacher } from "./endpoints/createTeacher";

import { addStudentToMission } from "./endpoints/addStudentToMission";
import { createMission } from "./endpoints/createMission";
import { addTeacherToMission } from "./endpoints/addTeachertoMIssion";

import { getStudentAge } from "./endpoints/getStudentAge";
import { getStudentsByMission } from "./endpoints/getStudentsByMission";
import { getTeachersByMission } from "./endpoints/getTeachersByMission";



dotenv.config();

export const connection = knex({
  client: "mysql",
  connection: {
     host: process.env.DB_HOST,
     port: Number(process.env.DB_PORT || "3306"),
     user: process.env.DB_USER,
     password: process.env.DB_PASSWORD,
     database: process.env.DB_NAME
  }
});

const app: Express = express();
app.use(express.json());
app.use(cors());

// endpoints aqui

app.put("/student", createStudent);

app.put("/teacher", createTeacher);

app.put('/mission', createMission);

app.post("/student/mission", addStudentToMission);

app.post("/teacher/mission", addTeacherToMission);

// app.get("/student/age/:id", getStudentAge)

// app.get("/student/mission/search", getStudentsByMission)

// app.get("/teacher/mission/search", getTeachersByMission)



const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
     const address = server.address() as AddressInfo;
     console.log(`Server is running in http://localhost:${address.port}`);
  } else {
     console.error(`Failure upon starting server.`);
  }
});