import { Router } from "express";
import categories from "./categories.js";
import games from "./games.js";

const router = Router();
router.use(categories);
router.use(games);
export default router;