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
        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM1JDRFEiLCJzdWIiOiJCUENXUTYiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3aHIgd3BybyB3bnV0IHdzbGUgd2VjZyB3c29jIHdhY3Qgd294eSB3dGVtIHd3ZWkgd2NmIHdzZXQgd2xvYyB3cmVzIiwiZXhwIjoxNjkzMjYxODQ2LCJpYXQiOjE2OTMyMzMwNDZ9.J86rko7QhQf9YHrWpQClgti5SAZ-mSniLAZ5R8WIkg4';
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const fitbitdata = await response.json()

        const Reservedcalories = await Progress.find({}, { calorieReserved: 1, _id: 0 })
        const totalReservedCalories = Reservedcalories.reduce((total, entry) => total + entry.calorieReserved, 0);
        const burnedCalories = fitbitdata.summary.activityCalories
        console.log("Total Burned Calories :" + burnedCalories)   
        console.log("Total Calories to be burned :" + totalReservedCalories)
        const progress = (burnedCalories/totalReservedCalories) *100;
        console.log("Progress for date :" + progress)

        res.status(200).json({progress, totalReservedCalories, burnedCalories })


    } catch (error) {
        res.status(404).json({ message: error.message })
        
    }
}

export const getMonthlyProgress = async(req,res) => {
    
    try {
        const { startDate, endDate } = req.params;

        const url = `https://api.fitbit.com/1/user/-/activities/tracker/activityCalories/date/${startDate}/${endDate}.json`;
        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM1JDRFEiLCJzdWIiOiJCUENXUTYiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3aHIgd3BybyB3bnV0IHdzbGUgd2VjZyB3c29jIHdhY3Qgd294eSB3dGVtIHd3ZWkgd2NmIHdzZXQgd2xvYyB3cmVzIiwiZXhwIjoxNjkzMjYxODQ2LCJpYXQiOjE2OTMyMzMwNDZ9.J86rko7QhQf9YHrWpQClgti5SAZ-mSniLAZ5R8WIkg4';
        
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

export const getTotalMonthlyProgress = async (req, res) => {
    try {
        const { startDate, endDate } = req.params;

        const url = `https://api.fitbit.com/1/user/-/activities/tracker/activityCalories/date/${startDate}/${endDate}.json`;
        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM1JDRFEiLCJzdWIiOiJCUENXUTYiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3aHIgd3BybyB3bnV0IHdzbGUgd2VjZyB3c29jIHdhY3Qgd294eSB3dGVtIHd3ZWkgd2NmIHdzZXQgd2xvYyB3cmVzIiwiZXhwIjoxNjkzMjYxODQ2LCJpYXQiOjE2OTMyMzMwNDZ9.J86rko7QhQf9YHrWpQClgti5SAZ-mSniLAZ5R8WIkg4'; // Replace this with your actual access token
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);


        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        const fitbitdata = await response.json();
        console.log(fitbitdata);

        // Calculate the total values
        const totalBurnedCalories = fitbitdata['activities-tracker-activityCalories']
            .map(entry => parseInt(entry.value))
            .reduce((acc, value) => acc + value, 0);

            const totalCalories = await Progress.aggregate([
                {
                    $match: {
                        date: {
                            $gte: startDateObj,
                            $lte: endDateObj
                        }
                    }
                },
                {
                    $group: {
                        _id: null,
                        totalCalories: { $sum: "$calorieReserved" }
                    }
                }
            ]);
    
            if (totalCalories.length === 0) {
                return res.status(404).json({ message: "No data found for the specified date range." });
            }

        res.status(200).json({ totalBurnedCalories,totalCalories: totalCalories[0].totalCalories });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
};


