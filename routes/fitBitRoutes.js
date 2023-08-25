import express from "express";
import { getDailyProgress } from "../controllers/workoutController.js";

const fitbitRoutes = express.Router();

fitbitRoutes.get('/',getDailyProgress)

export default fitbitRoutes;