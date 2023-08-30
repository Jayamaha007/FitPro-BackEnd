import express from "express";
import Diets from "../models/dietModel.js";


export const getDiets = async(req,res) => {
    try{
        console.log(req.query);
        const diets = await Diets.find(req.query);
        res.status(200).json(diets)

    }
    catch(error){
        res.status(404).json({ message: error.message })
    }
}
