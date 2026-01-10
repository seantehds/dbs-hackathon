import mongoose from "mongoose";
import app from "./app";
import { Response } from "express";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 3000;

// -------- API ROUTES --------

// test
app.get("/api/test", (_req, res: Response) => {
  console.log("test called")
  res.json({ api: "works hooray" });
});

// -------- START SERVER --------

app.listen(PORT, async () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(process.env.ATLAS_URI)
  await mongoose.connect(process.env.ATLAS_URI as string);
});


// -------- API ROUTES --------
