import { Router } from "express";
import { rentalscontroller } from "../controllers/rentalscontroller.js";
import { postrentalsMiddleware } from "../middlewares/rentalsMiddleware.js";

const rentals = Router();
rentals.post('/rentals',postrentalsMiddleware, rentalscontroller);
export default rentals;