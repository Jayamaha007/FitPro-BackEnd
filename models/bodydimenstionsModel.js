import mongoose from "mongoose";


const diemnsionSchema = new mongoose.Schema({
  imageName: String,
  hipSize: String,
  waistSize: String,
  gender: String
});


const Dimensions = mongoose.model('HipWaist', diemnsionSchema,'HipWaist');

export default Dimensions;