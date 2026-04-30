import Activity from '../models/Activity.js';
import Representative from '../models/Representative.js';

export const getTrainingHeatmap = async (req, res) => {
  try {
    const { start_date, end_date, department } = req.query;
    const dateFilter = {};

    if (start_date || end_date) {
      dateFilter.scheduled_date = {};
      if (start_date) dateFilter.scheduled_date.$gte = new Date(start_date);
      if (end_date) dateFilter.scheduled_date.$lte = new Date(end_date);
    }

    const activityPipeline = [
      { $match: { status: 'approved', ...dateFilter } },
      {
        $group: {
          _id: '$department',
          total_activities: { $sum: 1 },
          total_participants: { $sum: '$max_participants' }
        }
      },
      { $sort: { total_activities: -1 } }
    ];

    const repPipeline = [
      { $match: { validation_status: 'validated' } },
      {
        $group: {
          _id: '$department',
          total_reps: { $sum: 1 }
        }
      }
    ];

    const [activityStats, repStats] = await Promise.all([
      Activity.aggregate(activityPipeline),
      Representative.aggregate(repPipeline)
    ]);

    const repMap = new Map(repStats.map(r => [r._id, r.total_reps]));
    const heatmapData = activityStats.map(a => ({
      department: a._id,
      activities: a.total_activities,
      participants: a.total_participants,
      validated_representatives: repMap.get(a._id) || 0
    }));

    res.json(heatmapData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDepartmentStats = async (req, res) => {
  try {
    const { department } = req.params;

    const [activityStats, repStats] = await Promise.all([
      Activity.aggregate([
        { $match: { department } },
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 }
          }
        }
      ]),
      Representative.countDocuments({ department, validation_status: 'validated' })
    ]);

    res.json({ department, activity_by_status: activityStats, validated_reps: repStats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};