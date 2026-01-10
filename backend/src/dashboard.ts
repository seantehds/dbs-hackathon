import { Express, Request, Response } from 'express';

export function setupDashboardAPI(app: Express) {
  
  // COMBINED ENDPOINT: Dashboard Data
  // Returns groups data that frontend can use for both 2.1 and 2.2

  // Frontend Usage:
  // - Calculate 2.1 (Balance Summary) by summing totalSettled and totalPending across all groups
  // - Display 2.2 (Groups List) directly from the groups array

  app.get('/api/dashboard', async (req, res: Response) => {
    try {
      // Get userId from request (adjust based on your auth implementation)
      const userId = req.userId || req.headers['x-user-id'] as string;

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized: User ID not found'
        });
      }

      // Find all active groups where user is a member
      const groups = await Group.find({
        members: userId,
        isActive: true
      })
        .populate('members', 'name email') // Populate member details for display
        .sort({ lastActivity: -1 }) // Sort by most recent activity first
        .lean()
        .exec();

      // Format groups data with all necessary information
      const groupsData = groups.map((group: any) => ({
        _id: group._id.toString(),
        name: group.name,
        description: group.description,
        category: group.category,
        currency: group.currency,
        memberCount: group.members.length,
        members: group.members.map((member: any) => ({
          _id: member._id.toString(),
          name: member.name,
          email: member.email
        })),
        totalSettled: group.totalSettled || 0,
        totalPending: group.totalPending || 0,
        lastActivity: group.lastActivity,
        createdAt: group.createdAt
      }));

      // Return groups data - frontend will calculate summary from this
      return res.status(200).json({
        success: true,
        data: {
          groups: groupsData,
          totalGroups: groupsData.length
        }
      });

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch dashboard data',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });
}