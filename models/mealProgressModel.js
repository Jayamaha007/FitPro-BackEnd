import mongoose from "mongoose";

const mealSchema = mongoose.Schema({
    date: Date,
    waterConsumption: String,
     breakfastCalories: String,
    breakfastCarbs: String,
    breakfastProtein: String,
    breakfastFat: String,
    lunchCalories: String,
    lunchCarbs: String,
    lunchProtein: String,
    lunchFat: String,
    dinnerCalories: String,
    dinnerCarbs: String,
    dinnerProtein: String,
    dinnerFat: String,
    
})

const MealProgress = mongoose.model('MealProgress',mealSchema,'MealProgress')

export default MealProgress;