import express from "express";
import cors from "cors";
import connectDB from "./db.js";

import {getUser,createUser} from "./controllers/userController.js"
import { getDailyProgress,getWorkouts,getMonthlyProgress } from "./controllers/workoutController.js";
import { getMealProgress } from "./controllers/mealController.js";
import { getDimensions } from "./controllers/bodydimenstionsController.js";




const app = express()
app.listen(5000,() => console.log('server started at 5000'))
app.use(express.json())
app.use(cors());

app.get('/api/user',getUser)
app.post('/api/user',createUser)
app.get('/api/workouts',getWorkouts)
app.get('/api/getDailyProgress/:date',getDailyProgress)
app.get('/api/getMonthlyProgress/:startDate/:endDate',getMonthlyProgress)
app.get('/api/getMealProgress/:date', getMealProgress);
app.get('/api/getDimensions/:name', getDimensions);


 
connectDB();