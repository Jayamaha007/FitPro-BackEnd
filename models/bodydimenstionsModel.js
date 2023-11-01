import mongoose from "mongoose";


const diemnsionSchema = new mongoose.Schema({
  imageName: String,
  ratio: String,
  gender: String

});


const Dimensions = mongoose.model('HipWaist', diemnsionSchema,'HipWaist');

export default Dimensions;
