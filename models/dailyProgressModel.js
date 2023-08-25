import mongoose from "mongoose";

const workoutSchema = mongoose.Schema({
    workoutName : String,
    date : Date,
    calorieReserved : Number,
    reps : Number
})

const Workout = mongoose.model('Workouts',workoutSchema,'Workouts')

export default Workout;