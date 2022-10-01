import Joi from "joi";
import connection from '../database/database.js'

export default async function gamesMiddleware(req,res,next){
    const data = req.body;
    const postSchema = Joi.object({
        name: Joi.string().min(1).required(),
        image: Joi.string().min(1).required(),
        stockTotal: Joi.number().positive().required(),
        categoryId: Joi.number().required(),
        pricePerDay: Joi.number().positive().required()
    });
    const validate = postSchema.validate(data);
    if(validate.error){
        res.sendStatus(400);
        return;
    }
    try {
        const result = await connection.query('SELECT * FROM games');
        const categ = await connection.query('SELECT id FROM categories');
        const hasequal = result.rows.find((item)=> item.name === data.name);
        const existsid = categ.rows.find((item)=> item.id === data.categoryId);
        if(hasequal){
            res.sendStatus(409);
            return;
        }
        if(existsid==undefined){
            res.sendStatus(400);
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