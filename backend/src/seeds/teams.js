import mongoose from "mongoose";
import { Team } from "../models/team.model.js";
import { config } from "dotenv";
import { User } from "../models/user.model.js";

config();

const teams = [
  { name: "Team 1", pokemon: [] },
  { name: "Team 2", pokemon: [] },
  { name: "Team 3", pokemon: [] },
  { name: "Team 4", pokemon: [] },
  { name: "Team 5", pokemon: [] },
  { name: "Team 6", pokemon: [] },
  { name: "Team 7", pokemon: [] },
  { name: "Team 8", pokemon: [] },
  { name: "Team 9", pokemon: [] },
  { name: "Team 10", pokemon: [] },
];

const seedTeams = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    let user = await User.findOne();

    const userTeams = teams.map((team) => ({
      ...team,
      user: user._id,
    }));

    await Team.deleteMany({});
    await Team.insertMany(userTeams);
    console.log("Teams seeded successfully");
  } catch (error) {
    console.error("Error seeding teams:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedTeams();
