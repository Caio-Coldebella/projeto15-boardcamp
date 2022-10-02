import Joi from "joi";
import connection from '../database/database.js'

export async function customersMiddleware(req,res,next){
    const data = req.body;
    const postSchema = Joi.object({
        name: Joi.string().min(1).required(),
        phone: Joi.string().min(10).max(11).required(),
        cpf: Joi.string().min(11).max(11).required(),
        birthday: Joi.string().isoDate().required(),
    });
    const validate = postSchema.validate(data);
    if(validate.error){
        res.sendStatus(400);
        return;
    }
    try {
        const result = await connection.query('SELECT * FROM customers');
        const hasequal = result.rows.find((item)=> item.cpf === data.cpf);
        if(hasequal){
            res.sendStatus(409);
            return;
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
        return;
    }
    res.locals.data = data;
    next();
}

export async function customersputMiddleware(req,res,next){
    const data = req.body;
    const id = req.params.id
    const postSchema = Joi.object({
        name: Joi.string().min(1).required(),
        phone: Joi.string().min(10).max(11).required(),
        cpf: Joi.string().min(11).max(11).required(),
        birthday: Joi.string().isoDate().required(),
    });
    const validate = postSchema.validate(data);
    if(validate.error){
        res.sendStatus(400);
        return;
    }
    try {
        const result = await connection.query('SELECT * FROM customers');
        const hasequal = result.rows?result.rows.find((item)=> item.cpf === data.cpf):undefined;
        if(hasequal && hasequal.id != id){
            res.sendStatus(409);
            return;
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
        return;
    }
    res.locals.data = data;
    res.locals.id = id;
    next();
}