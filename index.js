import express from "express";
import connectDB from "./db.js";
import cors from "cors";

import { getUser, createUser } from "./controllers/userController.js";
import {
  getDailyProgress,
  getWorkouts,
  getMonthlyProgress,
} from "./controllers/workoutController.js";

const app = express();
app.listen(5000, () => console.log("server started at 5000"));
app.use(express.json());

app.use(cors());

app.use("/api/user", userRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/getDailyProgress", fitbitRoutes);

connectDB();
