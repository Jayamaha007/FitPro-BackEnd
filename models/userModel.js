import mongoose from "mongoose";



const userSchema = mongoose.Schema({
    fullName : String,
    Age : Number,
    email : String,
    sex : String
})

const User = mongoose.model('User',userSchema,'User')
export default User;
