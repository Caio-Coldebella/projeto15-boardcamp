import { Router } from "express";
import categories from "./categories.js";
import customers from "./customers.js";
import games from "./games.js";
import rentals from "./rentals.js";

const router = Router();
router.use(categories);
router.use(games);
router.use(customers);
router.use(rentals);
export default router;