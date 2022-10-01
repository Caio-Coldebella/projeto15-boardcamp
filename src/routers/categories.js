import { Router } from "express";
import { getcategoriescontroller, postcategoriescontroller } from "../controllers/categoriescontroller.js";
import categoriesMiddleware from "../middlewares/categoriesMiddleware.js";

const categories = Router();
categories.get('/categories', getcategoriescontroller);
categories.post('/categories', categoriesMiddleware, postcategoriescontroller);
export default categories;