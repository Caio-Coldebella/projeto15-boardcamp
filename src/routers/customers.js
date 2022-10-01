import { Router } from "express";
import { getbyid, getcustomers } from "../controllers/customerscontroller.js";

const customers = Router();
customers.get('/customers',getcustomers);
customers.get('/customers/:id',getbyid);
export default customers;