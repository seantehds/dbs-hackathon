import app from "./app";
import client from "./db/connection";
import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Db, ObjectId } from 'mongodb';

const PORT = process.env.PORT || 3000;
let database: Db;
const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret_key';


// -------- START SERVER --------
app.listen(PORT, async () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  await client.connect();
  database = await client.db("dbs_database")
  const colls = database.listCollections();
  for await (const doc of colls) {
    console.log(doc)
  }
  console.log("connected")
});

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
app.post("/api/register", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const usersCollection = database.collection('users');

    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const saltRounds = 10; // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // insert user
    const result = await usersCollection.insertOne({
      email,
      passwordHash: hashedPassword
    });

    // generate JWT
    const token = jwt.sign(
      { userId: result.insertedId, email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({ token, userId: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
});

// EXPENSES
app.get("/api/expenses/:userId", (req: Request, res: Response) => {
  console.log("expenses endpoint called");
});

// GROUPS
app.get("/api/groups/:userId", (req: Request, res: Response) => {
  try {
          const users = await app.User.find();
          res.json(users);
      } catch (err) {
          res.status(500).send('Error retrieving users');
      }
});

// Create group
app.post("/api/groups", (req: Request, res: Response) => { });