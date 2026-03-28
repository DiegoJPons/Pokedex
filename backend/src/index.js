import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

import { connectDB } from "./lib/db.js";

import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import teamRoutes from "./routes/team.route.js";
import { clerkMiddleware } from "@clerk/express";
import { protectRoute } from "./middleware/auth.middleware.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, "../../frontend/dist");

const app = express();
const PORT = process.env.PORT;

const corsOrigin =
  process.env.NODE_ENV === "production"
    ? true
    : process.env.CORS_ORIGIN || "http://localhost:3000";

app.use(
  cors({
    origin: corsOrigin,
    credentials: true,
  })
);

app.use(express.json());
app.use(clerkMiddleware());

app.use("/api/users", protectRoute, userRoutes);
app.use("/api/auth", protectRoute, authRoutes);
app.use("/api/teams", protectRoute, teamRoutes);

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath, { index: false }));
  app.use((req, res, next) => {
    if (req.method !== "GET" && req.method !== "HEAD") return next();
    if (req.path.startsWith("/api")) return next();
    res.sendFile(path.join(distPath, "index.html"), (err) => {
      if (err) next(err);
    });
  });
}

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
  connectDB();
});
