import mongoose from "mongoose";
const dbUrl = 'mongodb+srv://cubix:labs123@fitpro.ape4boz.mongodb.net/FitnessPro_db?retryWrites=true&w=majority'



const connectDB = () => {
    try {
       mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log("MongoDB connected");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
  };
export default connectDB;