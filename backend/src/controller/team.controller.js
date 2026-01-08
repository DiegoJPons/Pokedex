import { Team } from "../models/team.model.js";
import { User } from "../models/user.model.js";

export const getAllTeams = async (req, res) => {
  try {
    const user = await User.findOne({ clerkId: req.userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const teams = await Team.find({ user: user._id });
    res.json({ data: teams, message: "Teams fetched successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch teams" });
  }
};

export const updateTeam = async (req, res) => {
  const { teamId } = req.params;
  const updatedData = req.body;

  try {
    const user = await User.findOne({ clerkId: req.userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const team = await Team.findOneAndUpdate(
      { _id: teamId, user: user._id },
      updatedData,
      {
        new: true,
      }
    );

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.status(200).json({ data: team, message: "Team updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update team" });
  }
};

export const deleteTeam = async (req, res) => {
  const { teamId } = req.params;

  try {
    const deletedTeam = await Team.findByIdAndDelete(teamId);
    if (!deletedTeam)
      return res.status(404).json({ message: "Team not found" });
    res.json({ message: "Team deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete team" });
  }
};

export const createNewTeam = async (req, res) => {
  try {
    const clerkUserId = req.userId;
    const user = await User.findOne({ clerkId: clerkUserId });

    if (!user) {
      return res.status(404).json({
        message: "User not found in database",
      });
    }

    const team = await Team.create({
      name: "Untitled",
      pokemon: [],
      user: user._id,
    });
    res.status(201).json({ data: team, message: "Team created successfully" });
    console.log(team);
  } catch (error) {
    console.error("Failed to create team:", error);
    res.status(500).json({ message: "Failed to create team" });
  }
};
