import { Router } from "express";
import { getgames, postgames } from "../controllers/gamescontroller.js";
import gamesMiddleware from "../middlewares/gamesMiddleware.js";

const games = Router();
games.get('/games',getgames);
games.post('/games',gamesMiddleware,postgames);
export default games;