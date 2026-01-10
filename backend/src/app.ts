import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import client from "./db/connection";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


export default app;
