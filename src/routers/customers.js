import { Router } from "express";
import { getbyid, getcustomers, postcustomers } from "../controllers/customerscontroller.js";
import customersMiddleware from "../middlewares/customersMiddleware.js";

const customers = Router();
customers.get('/customers',getcustomers);
customers.get('/customers/:id',getbyid);
customers.post('/customers', customersMiddleware, postcustomers);
export default customers;