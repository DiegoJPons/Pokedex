import express from "express";
import {
  getAllTeams,
  updateTeam,
  deleteTeam,
  createNewTeam,
} from "../controller/team.controller.js";

const router = express.Router();

router.get("/", getAllTeams);
router.put("/:teamId", updateTeam);
router.delete("/:teamId", deleteTeam);
router.post("/", createNewTeam);

export default router;
