import express from "express";
import Meals from "../models/mealsModel.js";


export const getwholeMealbyType = async(req,res) => {
    

    try {
        const meals = await Meals.find();

        res.status(200).json(meals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}