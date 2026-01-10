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
app.get("/api/users", (_req, res: Response) => {
  console.log("get all users");
  res.json({ users: [1234] });
});
// LOGIN
app.post("/api/login", (req: Request, res: Response) => {
  console.log("login successful");
  res.json({ userId: "1234" });
});

// REGISTER
app.post("/api/register", (req: Request, res: Response) => {
  console.log("register successful");
  res.json({ userId: "1234" });
}); 

// EXPENSES
app.get("/api/expenses/:userId", (req: Request, res: Response) => {
  console.log("expenses endpoint called");
});

// GROUPS
app.get("/api/groups/:userId", (req: Request, res: Response) => {
  console.log("login successful");
  res.json({ groups: {}, summary: {} });
});

// Create group
app.post("/api/groups", (req: Request, res: Response) => {});

// -------- START SERVER --------
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
