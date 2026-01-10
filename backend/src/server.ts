import app from "./app";
import client from "./db/connection";
import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Db, ObjectId } from 'mongodb';

const PORT = process.env.PORT || 3000;
let database: Db;

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





// Assuming 'database' is passed in or available in scope
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key';

// --- REGISTER ENDPOINT ---
router.post('/register', async (req: Request, res: Response) => {

});

// --- LOGIN ENDPOINT ---
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const usersCollection = database.collection('users');

    // 1. Find user by email
    const user = await usersCollection.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 2. Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 3. Generate JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      token,
      user: { id: user._id, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});

export default router;