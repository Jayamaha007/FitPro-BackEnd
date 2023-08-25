import express from "express";
import { getDailyCaloriesFitBit } from "../controllers/workoutController.js";

const fitbitRoutes = express.Router();

fitbitRoutes.get('/',getDailyCaloriesFitBit)

export default fitbitRoutes;