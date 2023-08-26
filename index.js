import express from "express";
import connectDB from "./db.js";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import workoutRoutes from "./routes/workoutRoutes.js";
import fitbitRoutes from "./routes/fitBitRoutes.js";

const app = express();
app.listen(5000, () => console.log("server started at 5000"));
app.use(express.json());

app.use(cors());

app.use("/api/user", userRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/getDailyProgress", fitbitRoutes);

connectDB();
