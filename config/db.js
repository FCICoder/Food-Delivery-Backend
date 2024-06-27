import mongoose from "mongoose";

export const connectDB =  async ()=>{
    await mongoose.connect('mongodb+srv://mahmoudaadel1998:kdcuOl32KmKTmC2x@cluster0.nyxvxll.mongodb.net/food-del')
    .then(()=>console.log('Db connection established'))
}