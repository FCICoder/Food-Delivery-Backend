import express from "express";
import { addFood, deleteFood, listFood } from "../controllers/foodController.js";
import multer from "multer";
// const storage = multer.memoryStorage();
const foodRouter = express.Router();

// //! Image Storage Engine
// const storage = multer.memoryStorage({
//     destination:"uploads",
//     filename:(req, file , cb)=>{
//         return cb(null, `${Date.now()}${file.originalname}`);
//     }
// });


// const upload = multer({storage:storage});

foodRouter.post('/add',upload.single("image"),addFood);
foodRouter.get('/list',listFood);
foodRouter.delete('/remove' , deleteFood);


export default foodRouter;