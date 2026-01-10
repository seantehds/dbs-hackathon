import app from "./app";
import { Response, Request } from "express";
import client from "./db/connection";

const PORT = process.env.PORT || 3000;

// -------- API ROUTES --------

// test
app.get("/api/test", (_req, res: Response) => {
  console.log("test called")
  res.json({ api: "works hooray" });
});

// EXPENSES
app.get('/api/expenses/:userId', (req: Request, res: Response) => {
  console.log("expenses endpoint called")
})


// Landing Page
app.get("/api/groups/:userID", (_req, res: Response) => {
  res.json({ groups: [] });
})

// -------- START SERVER --------
app.listen(PORT, async () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  await client.connect();
  const database = await client.db("dbs_database")
  const colls = database.listCollections();
  for await (const doc of colls) {
    console.log(doc)
  }
  console.log("connected")
});