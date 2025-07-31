import Goal from '../models/Goal.js';

export const addGoal = async (req, res) => {
  try {
    const { groupId, title, progress, deadline } = req.body;
    const newGoal = new Goal({
      user: req.user._id,
      group: groupId,
      title,
      progress,
      deadline
    });
    await newGoal.save();
    res.status(201).json({ message: 'Goal added successfully', goal: newGoal });
  } catch (err) {
    res.status(500).json({ message: 'Error adding goal', error: err.message });
  }
};

export const getGoalsByGroup = async (req, res) => {
  try {
    const groupId = req.params.groupId;
    const goals = await Goal.find({
      user: req.user._id,
      group: groupId
    }).sort({ deadline: 1 });
    res.status(200).json(goals);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching goals', error: err.message });
  }
};
