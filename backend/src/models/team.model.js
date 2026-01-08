import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    pokemon: [
      {
        id: Number,
        name: String,
        types: [String],
        imageUrl: String,
      },
    ],
  },
  { timestamps: true }
);
export const Team = mongoose.model("Team", teamSchema);
