import mongoose from "mongoose";


const mealPlanSchema = new mongoose.Schema({
  dietType: String,
  isVeg: String,
  dayofWeek: String,
  image: String,
  breakfast: [String],
  lunch: [String],
  dinner: [String]
});


const Diets = mongoose.model('Diets', mealPlanSchema,'Diets');

export default Diets
