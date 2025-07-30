import User from "../models/User.js";
import bycrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const registerUser=async(req,res)=>{
    try {
        const{name,email,password}=req.body;
        const userExists= await User.findOne({email})
        if(userExists) return res.status(400).json({message:'User already exists'})
            const hashedPassword=await bycrypt.hash(password,10);
        const newUser=await User.create({name,email,password:hashedPassword})
        const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET,{expiresIn:'2d'})
        res.status(201).json({_id:newUser._id,name:newUser.name,email:newUser.email,token})
    } catch (error) {
        res.status(500).json({message:'Registeration failed',error:error.message})
    }

}


export const loginUser=async(req,res)=>{
try {
    const{email,password}=req.body;
    const user=await User.findOne({email})
    if(!user) return res.status(400).json({message:'User not found'})
        const isMatch=await bycrypt.compare(password,user.password)
    if(!isMatch) return res.status(401).json({message:'Invalid credentials'})
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'2d'})
    res.json({
        _id:user._id,
        name:user.name,
        email:user.email,
        token
    })
    
} catch (err) {
    res.status(500).json({message:'Login failed',error:err.message})
    
}
}