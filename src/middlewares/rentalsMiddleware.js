import Joi from "joi";
import connection from '../database/database.js'

export async function postrentalsMiddleware(req,res,next){
    const data = req.body;
    const postSchema = Joi.object({
        customerId: Joi.number().min(0).required(),
        gameId: Joi.number().min(0).required(),
        daysRented: Joi.number().min(0).required()
    });
    const validate = postSchema.validate(data);
    if(validate.error){
        res.sendStatus(400);
        return;
    }
    try {
    const games = await connection.query('SELECT * FROM games WHERE id=$1',[data.gameId]);
    const customers = await connection.query('SELECT * FROM customers WHERE id=$1',[data.customerId]);
    if(!games.rows || !customers.rows){
        res.sendStatus(400);
        return;
    }
    const numofrentals = await connection.query('SELECT * FROM rentals WHERE "gameId"=$1',[data.gameId]);
    if(numofrentals==undefined){
        numofrentals = 0
    }
    if(numofrentals >= games.rows.stockTotal){
        res.sendStatus(400);
        return;
    }
    res.locals.data = data;
    next();
    }catch(error){
        console.error(error);
        res.sendStatus(500);
    }
}