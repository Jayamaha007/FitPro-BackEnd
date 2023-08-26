import express from "express";
import MealProgress from "../models/mealProgressModel.js";

export const getMealProgress = async (req, res) => {
    try {
        const { date } = req.params;

        if (!date) {
            return res.status(400).json({ message: "Date parameter is required." });
        }

        const searchDate = new Date(date); // Convert the date string to a JavaScript Date object

        // Construct the search range for the given date (from midnight to the next day's midnight)
        const startDate = new Date(searchDate);
        startDate.setUTCHours(0, 0, 0, 0);

        const endDate = new Date(searchDate);
        endDate.setUTCHours(23, 59, 59, 999);

        const meal = await MealProgress.find({
            date: { $gte: startDate, $lte: endDate }
        });

        res.status(200).json(meal);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while fetching data." });
    }
};
