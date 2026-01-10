import app from "./app";
import client from "./db/connection";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Db } from "mongodb";

const PORT = process.env.PORT || 3000;
let database: Db;
const JWT_SECRET = process.env.JWT_SECRET || "jwt_secret_key";

// -------- START SERVER --------
app.listen(PORT, async () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  await client.connect();
  database = await client.db("dbs_database");
  const colls = database.listCollections();
  for await (const doc of colls) {
    console.log(doc);
  }
  console.log("connected");
});

// -------- API ROUTES --------

// test
app.get("/api/test", (_req, res: Response) => {
  console.log("test called");
  res.json({ api: "works hooray" });
});

// USERS
app.get("/api/users", async (_req, res: Response) => {
  const usersCollection = database.collection("users")
  const usersDocuments = await usersCollection.find().toArray()
  res.json({ users: usersDocuments});
});

// LOGIN
app.post("/api/login", (req: Request, res: Response) => {
  console.log("login successful");
  res.json({ userId: "1234" });
});

// REGISTER
app.post("/api/register", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const usersCollection = database.collection("users");

    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const saltRounds = 10; // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // insert user
    const result = await usersCollection.insertOne({
      email,
      passwordHash: hashedPassword,
    });

    // generate JWT
    const token = jwt.sign({ userId: result.insertedId, email }, JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(201).json({ token, userId: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
});

// EXPENSES
app.get("/api/expenses/:userId", (req: Request, res: Response) => {
  console.log("expenses endpoint called");
});

// GROUPS get user's groups based on userId
app.get("/api/groups/:userId", async (req: Request, res: Response) => {
  console.log("get user's groups");
  await client.connect();
  const database = await client.db("dbs_database");
  const groups = database.collection("groups");
  const userGroups = await groups
    .find({ members: req.params.userId })
    .toArray();
  res.json({ groups: userGroups });
});

// Create group
app.post("/api/groups", async (req: Request, res: Response) => {
  const name = req.query.name;
  const currency = req.query.currency;
  const category = req.query.category;
  const description = req.query.description;
  const members = (req.query.members as string).split(",");
  const groups = database.collection("groups");
  const response = await groups.insertOne({
    name: name,
    members: members,
    currency: currency,
    category: category,
    description: description,
  });

  res.json({ done: response.insertedId });
});
