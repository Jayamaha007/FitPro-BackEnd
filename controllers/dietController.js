import express from "express";
import Diets from "../models/dietModel.js";


export const getDiets = async(req,res) => {
    try{
        console.log(req.params);
        const diets = await Diets.find(req.params);
        res.status(200).json(diets)

    }
    catch(error){
        res.status(404).json({ message: error.message })
    }
}

export const getDietbyTheDay = async(req,res) => {
    try{
        console.log(req.params);
        const diets = await Diets.find(req.params);
        res.status(200).json(diets)

    }
    catch(error){
        res.status(404).json({ message: error.message })
    }
}
