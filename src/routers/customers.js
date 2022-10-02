import { Router } from "express";
import { getbyid, getcustomers, postcustomers, putcostumers } from "../controllers/customerscontroller.js";
import {customersMiddleware, customersputMiddleware} from "../middlewares/customersMiddleware.js";

const customers = Router();
customers.get('/customers',getcustomers);
customers.get('/customers/:id',getbyid);
customers.post('/customers', customersMiddleware, postcustomers);
customers.put('/customers/:id', customersputMiddleware, putcostumers);
export default customers;