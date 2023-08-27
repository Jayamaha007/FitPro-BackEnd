import express from "express";
import Workout from "../models/workoutModel.js";
import fetch from "node-fetch";
import Progress from "../models/dailyProgressModel.js";


export const getWorkouts = async(req,res) => {
    try{
        console.log(req.query);
        const workouts = await Workout.find(req.query);
        res.status(200).json(workouts)

    }
    catch(error){
        res.status(404).json({ message: error.message })
    }
}

export const postCompletedWorkouts = async(req,res) => {
    try{
        const workout = req.body;
        const finWorkout = new Progress({...workout,creator:req.userId,createAt:new Date().toISOString()});
        await finWorkout.save()
        res.status(201).json(newUser);

    }
    catch(error){
        res.status(404).json({ message: error.message })
    }
}



export const getDailyProgress = async(req,res) => {
    try {
        
        const { date } = req.params;
        console.log(date);
        const url = `https://api.fitbit.com/1/user/-/activities/date/${date}.json`;
        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM1JDRFEiLCJzdWIiOiJCUENXUTYiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3aHIgd251dCB3cHJvIHdzbGUgd2VjZyB3c29jIHdhY3Qgd294eSB3dGVtIHd3ZWkgd2NmIHdzZXQgd2xvYyB3cmVzIiwiZXhwIjoxNjkzMTQ0NjgzLCJpYXQiOjE2OTMxMTU4ODN9.iUzGrJNSM5m1HYuWaFxJ3ie8utuDNQATgJPzfXLU0OY';
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const fitbitdata = await response.json()

        const Reservedcalories = await Progress.find({}, { calorieReserved: 1, _id: 0 })
        const totalReservedCalories = Reservedcalories.reduce((total, entry) => total + entry.calorieReserved, 0);
        console.log("Total Burned Calories :" + fitbitdata.summary.activityCalories)   
        console.log("Total Calories to be burned :" + totalReservedCalories)
        const progress = (fitbitdata.summary.activityCalories/totalReservedCalories) *100;
        console.log("Progress for date :" + progress)

        res.status(200).json(progress)


    } catch (error) {
        res.status(404).json({ message: error.message })
        
    }
}

export const getMonthlyProgress = async(req,res) => {
    
    try {
        const { startDate, endDate } = req.params;

        const url = `https://api.fitbit.com/1/user/-/activities/tracker/activityCalories/date/${startDate}/${endDate}.json`;
        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM1JDRFEiLCJzdWIiOiJCUENXUTYiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3aHIgd251dCB3cHJvIHdzbGUgd2VjZyB3c29jIHdhY3Qgd294eSB3dGVtIHd3ZWkgd2NmIHdzZXQgd2xvYyB3cmVzIiwiZXhwIjoxNjkzMDQ4NDg2LCJpYXQiOjE2OTMwMTk2ODZ9.A_AQ8IWpiTWxVYS2Wy4ozesJpxThCOIrcLLhbj0Rcc0';
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const fitbitdata = await response.json()
        res.status(200).json(fitbitdata)
        console.log(fitbitdata)


        
    } catch (error) {
        
    }

}
