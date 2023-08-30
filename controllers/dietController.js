import express from "express";
import Workout from "../models/workoutModel.js";


export const getDiets = async(req,res) => {
    try{
        console.log(req.query);
        const diets = await Workout.find(req.query);
        res.status(200).json(diets)

    }
    catch(error){
        res.status(404).json({ message: error.message })
    }
}
