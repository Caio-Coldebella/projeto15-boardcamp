import { Router } from "express";
import { getcategoriescontroller } from "../controllers/categoriescontroller.js";

const categories = Router();
categories.get('/categories', getcategoriescontroller);
categories.post('/categories', async (req,res)=>{
    res.send("hello")
});
export default categories;