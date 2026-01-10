import app from "./app";
import { Response } from "express";

const PORT = process.env.PORT || 3000;

// -------- API ROUTES --------

// test
app.get("/api/test", (_req, res: Response) => {
  console.log("test called")
  res.json({ api: "works hooray" });
});

// -------- START SERVER --------

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});


// -------- API ROUTES --------
