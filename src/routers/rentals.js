import { Router } from "express";
import { endrentalscontroller, getrentalscontroller, postrentalscontroller } from "../controllers/rentalscontroller.js";
import { postrentalsMiddleware } from "../middlewares/rentalsMiddleware.js";

const rentals = Router();
rentals.get('/rentals',getrentalscontroller);
rentals.post('/rentals',postrentalsMiddleware, postrentalscontroller);
rentals.post('/rentals/:id/return', endrentalscontroller);
export default rentals;