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

// Landing Page
app.get("/api/groups/:userID", (_req, res: Response) => {
  res.json({ groups: [] });
}
/***
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});


import express, { Request, Response } from 'express';
import Group from '';

const router = express.Router();

// Create a new group
router.post('/groups', async (req: Request, res: Response) => {
  try {
    const group = await Group.create(req.body);
    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add members to a group
router.post('/groups/:groupId/members', async (req: Request, res: Response) => {
  try {
    const group = await Group.findById(req.params.groupId);
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }
    const member = await group.members.create(req.body);
    res.status(201).json(member);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Retrieve group details
router.get('/groups/:groupId', async (req: Request, res: Response) => {
  try {
    const group = await Group.findById(req.params.groupId).populate('members');
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update group details
router.put('/groups/:groupId', async (req: Request, res: Response) => {
  try {
    const group = await Group.findByIdAndUpdate(req.params.groupId, req.body, { new: true });
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a group
router.delete('/groups/:groupId', async (req: Request, res: Response) => {
  try {
    const group = await Group.findByIdAndDelete(req.params.groupId);
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }
    res.status(200).json({ message: 'Group deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
***/