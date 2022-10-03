import { Router } from "express";
import { deleterentalscontroller, endrentalscontroller, getrentalscontroller, postrentalscontroller } from "../controllers/rentalscontroller.js";
import { postrentalsMiddleware } from "../middlewares/rentalsMiddleware.js";

const rentals = Router();
rentals.get('/rentals',getrentalscontroller);
rentals.post('/rentals',postrentalsMiddleware, postrentalscontroller);
rentals.post('/rentals/:id/return', endrentalscontroller);
rentals.delete('/rentals/:id',deleterentalscontroller);
export default rentals;