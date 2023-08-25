import mongoose from "mongoose";

const workoutSchema = mongoose.Schema({
    workoutName : String,
    workoutType : String,
    sets : Number,
    reps : Number
})

const Workout = mongoose.model('Workouts',workoutSchema,'Workouts')

export default Workout;