import mongoose from 'mongoose';
import User from '../models/userModel.js'



export const getUser = async (req, res) => {
    try {
        const user = await User.find();
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }


};


export const createUser = async(req,res) => {
    const user = req.body;
    const newUser = new User({...user,creator:req.userId,createAt:new Date().toISOString()});
    
    try{
        await newUser.save()
        res.status(201).json(newUser);
    }
    catch(error){
        res.status(409).json({message:error.message})
    }

}

 


