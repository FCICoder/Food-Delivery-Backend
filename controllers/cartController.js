import userModel from "../models/userModel.js";

//! add items to user Cart
const addToCart = async (req , res) => {
    try{
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;
        }else {
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId , {cartData: cartData});
        res.status(200).json({success: true, message: "Item added to cart successfully"});

    }catch(err){
        console.error(err);
        res.status(500).json({success: false, message: "Error adding item to cart"});
    }
};

//! remove items from user Cart 
const removeFromCart = async (req , res) => {
    try{
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId]){
            if(cartData[req.body.itemId] > 0){
                cartData[req.body.itemId] -= 1;
                if(cartData[req.body.itemId] == 0) {
                    delete cartData[req.body.itemId];
                }
            }
        }

        await userModel.findByIdAndUpdate(req.body.userId, {cartData: cartData});
        res.status(200).json({success: true, message: "Item removed from cart successfully"});
    }catch(err){
        res.status(500).json({success: false, message:  err.message});
    }
};

//! fetch user Cart data
const getCart = async (req , res) => {
    try{
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.status(200).json({success: true, cartData});

    }catch(err){
        console.log(err.message);
        res.status(500).json({success: false, message:  "Error while retrieving cart data"});
    }
}; 

export { addToCart, removeFromCart, getCart };
