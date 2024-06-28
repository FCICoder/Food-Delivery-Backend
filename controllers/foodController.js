import foodModel from "../models/foodeModel.js";
import fs from 'fs';

// ! add food Items 
const addFood = async (req , res)=>{
    let image_filename = `${req.file.filename}`;
    const food = new foodModel({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        image: image_filename
    })

    try {
        await food.save();
        res.status(201).json({success:true , message: 'food added successfully'});
    } catch (error) {
        res.status(400).json({success:false,message: error.message});
    }
}

// ! all food list
const listFood = async (req, res) => {
    try{
        const foods = await foodModel.find({});
        res.status(200).json({success:true,data:foods});
    }catch(err){
        res.status(400).json({success:false,message:err.message});
    }
}

// ! delete food item
const deleteFood = async (req,res) => {
    try{
        const food = await foodModel.findByIdAndDelete(req.body.id);
        if(!food){
            return res.status(404).json({success:false, message: 'Food not found'});
        }
        fs.unlinkSync(`uploads/${food.image}`);
        res.status(200).json({success:true, message: 'Food deleted successfully'});
    }catch(err){
        res.status(400).json({success:false, message: err.message});
    }
}

export {addFood , listFood , deleteFood}