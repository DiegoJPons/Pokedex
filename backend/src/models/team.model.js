import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  pokemon: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pokemon" }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export const Team = mongoose.model("Team", teamSchema);
