import Joi from "joi";
import connection from '../database/database.js'

export default async function categoriesMiddleware(req,res,next){
    const data = req.body;
    const postSchema = Joi.object({
        name: Joi.string().min(1).required(),
    });
    const validate = postSchema.validate(data);
    if(validate.error){
        res.sendStatus(400);
        return;
    }
    try {
        const result = await connection.query('SELECT * FROM categories');
        const hasequal = result.rows.find((item)=> item.name === data.name);
        if(hasequal){
            res.sendStatus(409);
            return;
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }

    res.locals.data = data;
    next();
}