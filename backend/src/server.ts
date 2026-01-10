import app from "./app";
import { Response, Request } from "express";

const PORT = process.env.PORT || 3000;

// -------- API ROUTES --------

// test
app.get("/api/test", (_req, res: Response) => {
  console.log("test called");
  res.json({ api: "works hooray" });
});

// USERS

// EXPENSES
app.get("/api/expenses/:userId", (req: Request, res: Response) => {
  console.log("expenses endpoint called");
});

// GROUPS
app.get("/api/groups/:userId", (req: Request, res: Response) => {
  console.log("login successful");
  res.json({ groups: {}, summary: {} });
});

app.post("/api/groups", (req: Request, res: Response) => {});

// -------- START SERVER --------
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
