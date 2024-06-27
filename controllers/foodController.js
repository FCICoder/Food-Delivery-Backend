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

export {addFood}