import { Router } from "express";
import { getgames } from "../controllers/gamescontroller.js";

const games = Router();
games.get('/games',getgames);

export default games;