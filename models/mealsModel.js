import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    foodName: String,
    quantity: String,
    calories: Number
});

const mealSchema = new mongoose.Schema({
    mealType: String,
    isVegetarian: Boolean,
    mealImg: String,
    meals: [
        {
            mealName: String,
            description: String,
            image: String,
            foods: [foodSchema]
        }
    ]
});

const Meals = mongoose.model('Meal', mealSchema,'Meals');

export default Meals
