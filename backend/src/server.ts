import app from "./app";
import client from "./db/connection";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Db } from "mongodb";
import { getDashboard } from "./dashboard";

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
  const usersCollection = database.collection("users");
  const usersDocuments = await usersCollection.find().toArray();
  res.json({ users: usersDocuments });
});

// LOGIN
app.post("/api/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    const usersCollection = database.collection("users");

    const user = await usersCollection.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      token,
      user: { id: user._id, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});

// REGISTER
app.post("/api/register", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

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
// Read
app.get("/api/expenses/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const expensesCollection = database.collection("expenses");
  const expensesDocuments = await expensesCollection
    .find({ $or: [{ paidBy: userId }, { paidTo: userId }] })
    .toArray();
  res.json({ expenses: expensesDocuments });
});

// Create
app.post("/api/expenses", async (req: Request, res: Response) => {
  const paidBy = req.query.paidBy;
  const paidTo = req.query.paidTo;
  const expenseName = req.query.expenseName;
  const amount = req.query.amount;
  const groupId = req.query.groupId;
  const expensesCollection = database.collection("expenses");
  const response = await expensesCollection.insertOne({
    expenseName: expenseName,
    amount: amount,
    paidBy: paidBy,
    paidTo: paidTo,
    groupId: groupId,
    status: "Not Paid",
  });
  res.json({ insertedId: response.insertedId });
});

// GROUPS get user's groups based on userId
app.get("/api/groups/:userId", async (req: Request, res: Response) => {
  console.log("get user groups");
  await getDashboard(req, res, client);
});

// Create group
app.post("/api/groups", async (req: Request, res: Response) => {
  const name = req.query.name;
  const currency = req.query.currency;
  const category = req.query.category;
  const description = req.query.description;
  const members = (req.query.members as string).split(",");
  const groupsCollection = database.collection("groups");
  const response = await groupsCollection.insertOne({
    name: name,
    members: members,
    currency: currency,
    category: category,
    description: description,
  });

  res.json({ insertedId: response.insertedId });
});
