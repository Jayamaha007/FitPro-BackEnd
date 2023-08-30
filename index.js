import express from "express";
import cors from "cors";
import connectDB from "./db.js";
import bodyParser from 'body-parser';

import {getUser,createUser} from "./controllers/userController.js"
import { getDailyProgress,getWorkouts,getMonthlyProgress,getTotalMonthlyProgress } from "./controllers/workoutController.js";
import { getMealProgress } from "./controllers/mealController.js";
import { getDimensions } from "./controllers/bodydimenstionsController.js";
import { getwholeMealbyType } from "./controllers/mealsController.js";
import predictWorkout from './controllers/predictWorkoutController.js';
import { getDiets } from "./controllers/dietController.js";





const app = express()
app.listen(5000,() => console.log('server started at 5000'))
app.use(express.json())
app.use(cors());
app.use(bodyParser.json());

app.get('/api/user',getUser)
app.post('/api/user',createUser)
app.get('/api/workouts',getWorkouts)
app.get('/api/diets', getDiets);
app.get('/api/getDailyProgress/:date',getDailyProgress)
app.get('/api/getMonthlyProgress/:startDate/:endDate',getMonthlyProgress)
app.get('/api/getTotalMonthlyProgress/:startDate/:endDate',getTotalMonthlyProgress)
app.get('/api/getMealProgress/:date', getMealProgress);
app.get('/api/getDimensions/:name', getDimensions);
app.post('/api/predict', predictWorkout);



 
connectDB();