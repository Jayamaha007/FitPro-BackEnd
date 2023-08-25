import mongoose from "mongoose";

const progressSchema = mongoose.Schema({
    workoutName : String,
    date : Date,
    calorieReserved : Number,
    
})

const Progress = mongoose.model('DailyProgress',progressSchema,'DailyProgress')

export default Progress;