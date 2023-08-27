import mongoose from "mongoose";

const workoutSchema = mongoose.Schema({
    workoutName: String,
    workoutType: String,
    sets: Number,
    reps: Number,
    caloriesEstimation: Number,
    image: String,
    duration: Number,
    intensity: String,
    steps: [String],
    workoutPlace: String,
})

const Workout = mongoose.model('Workouts',workoutSchema,'Workouts')

export default Workout;