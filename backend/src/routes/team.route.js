import express from "express";
import { Team } from "../models/team.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const teams = await Team.find().populate("user");
    res.json(teams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch teams" });
  }
});

export default router;
