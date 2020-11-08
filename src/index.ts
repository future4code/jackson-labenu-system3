import express, { Express } from "express";
import knex from "knex";
import cors from "cors";
import dotenv from "dotenv";
import { AddressInfo } from "net";

import { createStudent } from "./endpoints/createStudent";
import { changeStudentMission } from "./endpoints/changeStudentMission";
import { getStudentAge } from "./endpoints/getStudentAge";
import { getStudentsByMission } from "./endpoints/getStudentsByMission";
import { removeStudent } from "./endpoints/removeStudent";

import { createTeacher } from "./endpoints/createTeacher";
import { changeTeacherMission } from "./endpoints/changeTeacherMission";
import { getTeachersByMission } from "./endpoints/getTeachersByMission";

import { createMission } from "./endpoints/createMission";
import { removeStudentMission } from "./endpoints/removeStudentMission";
import { removeTeacherMission } from "./endpoints/removeTeacherMission";

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

app.post("/student/mission", changeStudentMission);

app.get("/student/age/:id", getStudentAge);

app.get("/student/mission/search", getStudentsByMission);

app.delete("/student/delete/:id", removeStudent);

app.put("/teacher", createTeacher);

app.post("/teacher/mission", changeTeacherMission);

app.get("/teacher/mission/search", getTeachersByMission);

app.put('/mission', createMission);

app.put('/mission/remove/student/:id', removeStudentMission);

app.put('/mission/remove/teacher/:id', removeTeacherMission);

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
     const address = server.address() as AddressInfo;
     console.log(`Server is running in http://localhost:${address.port}`);
  } else {
     console.error(`Failure upon starting server.`);
  }
});