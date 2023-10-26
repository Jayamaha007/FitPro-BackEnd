import express from "express";
import Workout from "../models/workoutModel.js";
import fetch from "node-fetch";
import Progress from "../models/dailyProgressModel.js";

const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM1JEWjMiLCJzdWIiOiJCRFBOSkQiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3aHIgd3BybyB3bnV0IHdzbGUgd2VjZyB3c29jIHdhY3Qgd294eSB3dGVtIHd3ZWkgd2NmIHdzZXQgd3JlcyB3bG9jIiwiZXhwIjoxNjk4Mzc4MjIyLCJpYXQiOjE2OTgzNDk0MjJ9.555OhagtcPbUzf7bhqtwVuih1PgDJDHKbWZjHpiaUcQ'




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
       // const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM1JEWjMiLCJzdWIiOiJCRFBOSkQiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3aHIgd3BybyB3bnV0IHdzbGUgd2VjZyB3c29jIHdhY3Qgd294eSB3dGVtIHd3ZWkgd2NmIHdzZXQgd2xvYyB3cmVzIiwiZXhwIjoxNjkzNjgxMzczLCJpYXQiOjE2OTM2NTI1NzN9.nsUhJmPgKwDjw2jpTxkpqhLoBK3HSzRDepz-EXPumxU';
        
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
        //const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM1JEWjMiLCJzdWIiOiJCRFBOSkQiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3aHIgd3BybyB3bnV0IHdzbGUgd2VjZyB3c29jIHdhY3Qgd294eSB3dGVtIHd3ZWkgd2NmIHdzZXQgd2xvYyB3cmVzIiwiZXhwIjoxNjkzNjgxMzczLCJpYXQiOjE2OTM2NTI1NzN9.nsUhJmPgKwDjw2jpTxkpqhLoBK3HSzRDepz-EXPumxU';
        
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
        let totalBurnedCalories = 0;
        if (fitbitdata['activities-tracker-activityCalories']) {
            totalBurnedCalories = fitbitdata['activities-tracker-activityCalories']
                .map(entry => parseInt(entry.value))
                .reduce((acc, value) => acc + value, 0);
        }

        let totalCalories = await Progress.aggregate([
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

        // Set a default value for totalCalories if it's empty
        if (totalCalories.length === 0) {
            totalCalories = [{ totalCalories: 0 }];
        }

        totalCalories = totalCalories[0].totalCalories; // Set totalCalories to the correct value

        res.status(200).json({ totalBurnedCalories, totalCalories });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
};



export const getActivityLevel = async (req, res) => {
    try {
        const { date } = req.params;
        console.log(date);
        const url = `https://api.fitbit.com/1/user/-/activities/date/${date}.json`;
        

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const fitbitData = await response.json();

        // Extract relevant data from the Fitbit response
        const { steps, summary: { fairlyActiveMinutes, lightlyActiveMinutes, veryActiveMinutes } } = fitbitData;
       
        // Calculate totalMinutes
        const totalMinutes = fairlyActiveMinutes + lightlyActiveMinutes + veryActiveMinutes;

        // Determine the activity level based on the given criteria
        let activityLevel = 'Low';

        if (steps < 5000 && totalMinutes < 30) {
            activityLevel = 'Low';
        } else if (steps >= 5000 && steps < 10000 && totalMinutes >= 30 && totalMinutes < 60) {
            activityLevel = 'Moderate';
        } else if (steps >= 10000 && totalMinutes >= 60) {
            activityLevel = 'High';
        }

        res.status(200).json({ activityLevel });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}





