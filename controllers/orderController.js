import { CurrencyCodes } from "validator/lib/isISO4217.js";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// !placing user order for frontend
const placeOrder = async (req , res)=> {
    const frontend_url = 'https://localhost:5173';
    try{
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })

        await newOrder.save();

        let x = await userModel.findByIdAndUpdate(req.body.userId , {cartData:{}});

        const line_items = req.body.items.map((item)=>({
            price_data:{
                currency:"EGP",
                product_data:{
                    name: item.name,
                },
                unit_amount:item.price*100*50
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: "EGP",
                product_data: {
                    name: "Delivery Charges",
                },
                unit_amount: 2*100*50
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items:line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });
        res.json({success: true, session_url: session.url});
    }catch(err){
        console.log(err.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
} 

const verifyOrder = async(req , res)=>{
    const {orderId , success} = req.body;
    try{
        if(success== 'true'){
            await orderModel.findByIdAndUpdate(orderId , {payment:true});
            res.json({success: true, message: "Payment Successful"});
        }else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success: false, message: "Payment Failed"});
        }
    }catch(err){
        console.log(err.message);
        res.status(500).json({success: false, message: "Server Error"});    
    }
}

//! user orders for frontend
const userOrders = async (req, res) => {
    try{
        const orders = await orderModel.find({userId:req.body.userId});
        res.json({success: true, data:orders});
    }catch(err){
        console.log(err.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
}

// ! Listing orders for admin pannel
const listOrders =async (req, res) => {
    try{
        const orders = await orderModel.find({}).populate('userId');
        res.json({success: true, data: orders});
    }catch(err){
        console.log(err.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
}

// ! updating order status for admin pannel

const updateStatus = async (req, res) => {
    try{
        const order = await orderModel.findByIdAndUpdate(req.body.orderId, {status: req.body.status});
        res.json({success: true, message: "Order updated"});
    }catch(err){
        console.log(err.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
}

export {placeOrder , verifyOrder , userOrders , listOrders , updateStatus }