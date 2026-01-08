import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./lib/db.js";

import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import teamRoutes from "./routes/team.route.js";
import { clerkMiddleware } from "@clerk/express";
import { protectRoute } from "./middleware/auth.middleware.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(clerkMiddleware()); // this will add auth to req obj => req.auth

app.use("/api/users", protectRoute, userRoutes);
app.use("/api/auth", protectRoute, authRoutes);
app.use("/api/teams", protectRoute, teamRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
  connectDB();
});
