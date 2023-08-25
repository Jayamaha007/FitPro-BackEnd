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



export const getDailyProgress = async(req,res) => {
    try {
        const url = 'https://api.fitbit.com/1/user/-/activities/date/2023-08-25.json'
        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM1JDRFEiLCJzdWIiOiJCUENXUTYiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3aHIgd3BybyB3bnV0IHdzbGUgd2VjZyB3c29jIHdhY3Qgd294eSB3dGVtIHd3ZWkgd2NmIHdzZXQgd3JlcyB3bG9jIiwiZXhwIjoxNjkzMDEyNTc0LCJpYXQiOjE2OTI5ODM3NzR9.DCPT5p8qxGePmkGmZ-qGJZL6DjMTsLC3JZ7sYfBnhR0'
        
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
