import express, { Express } from "express";
import knex from "knex";
import cors from "cors";
import dotenv from "dotenv";
import { AddressInfo } from "net";

import { createStudent } from "./endpoints/createStudent";
import { addStudentToMission } from "./endpoints/addStudentToMission";
import { getStudentAge } from "./endpoints/getStudentAge";
import { getStudentsByMission } from "./endpoints/getStudentsByMission";

import { createTeacher } from "./endpoints/createTeacher";
import { addTeacherToMission } from "./endpoints/addTeachertoMIssion";
import { getTeachersByMission } from "./endpoints/getTeachersByMission";

import { createMission } from "./endpoints/createMission";

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

app.put("/student", createStudent);

app.post("/student/mission", addStudentToMission);

app.get("/student/age/:id", getStudentAge);

app.get("/student/mission/search", getStudentsByMission);

app.put("/teacher", createTeacher);

app.post("/teacher/mission", addTeacherToMission);

app.get("/teacher/mission/search", getTeachersByMission);

app.put('/mission', createMission);

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
     const address = server.address() as AddressInfo;
     console.log(`Server is running in http://localhost:${address.port}`);
  } else {
     console.error(`Failure upon starting server.`);
  }
});