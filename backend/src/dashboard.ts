import { Request, Response } from 'express';
import { MongoClient } from 'mongodb';

export const getDashboard = async (req: Request, res: Response, client: MongoClient) => {
  console.log("get dashboard data");
  const database = client.db("dbs_database");
  const groups = database.collection("groups");
  const users = database.collection("users");
  
  // Find all groups where user is a member
  const userGroups = await groups.find({ members: req.params.userId }).toArray();
  
  // Get member details for each group
  const groupsWithDetails = await Promise.all(
    userGroups.map(async (group: any) => {
      // Get all member details
      const memberIds = group.members || [];
      const memberDetails = await users.find({ 
        _id: { $in: memberIds } 
      }).toArray();
      
      return {
        _id: group._id,
        name: group.name,
        description: group.description,
        category: group.category,
        currency: group.currency || 'USD',
        memberCount: memberIds.length,
        members: memberDetails.map((member: any) => ({
          _id: member._id,
          name: member.name,
          email: member.email
        })),
        totalSettled: group.totalSettled || 0,
        totalPending: group.totalPending || 0,
        lastActivity: group.lastActivity || group.updatedAt || group.createdAt
      };
    })
  );
  
  // Sort by most recent activity
  groupsWithDetails.sort((a, b) => {
    return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime();
  });
  
  res.json({ 
    groups: groupsWithDetails,
    totalGroups: groupsWithDetails.length
  });
};
