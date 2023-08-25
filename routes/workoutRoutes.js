import express from "express";
import { getWorkouts } from "../controllers/workoutController.js";

const workoutRoutes = express.Router();

workoutRoutes.get('/',getWorkouts)



export default workoutRoutes;