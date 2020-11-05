import express, { Express } from "express";
import knex from "knex";
import cors from "cors";
import dotenv from "dotenv";
import { AddressInfo } from "net";
import { createStudent } from "./endpoints/createStudent";
import { createTeacher } from "./endpoints/createTeacher";
import { getStudentAge } from "./endpoints/getStudentAge";

import { addStudenttoMission } from "./endpoints/addStudenttoMission ";

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

// endpoints aqui

app.put("/student", createStudent);

app.put("/teacher", createTeacher);

app.get("/student/age/:id", getStudentAge)

app.post("/student/mission", addStudenttoMission)

app.put('/mission', createMission)



const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
     const address = server.address() as AddressInfo;
     console.log(`Server is running in http://localhost:${address.port}`);
  } else {
     console.error(`Failure upon starting server.`);
  }
});