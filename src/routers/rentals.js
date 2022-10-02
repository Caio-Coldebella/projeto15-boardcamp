import { Router } from "express";
import { getrentalscontroller, postrentalscontroller } from "../controllers/rentalscontroller.js";
import { postrentalsMiddleware } from "../middlewares/rentalsMiddleware.js";

const rentals = Router();
rentals.get('/rentals',getrentalscontroller);
rentals.post('/rentals',postrentalsMiddleware, postrentalscontroller);
export default rentals;