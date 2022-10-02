import connection from '../database/database.js'
import date from 'date-and-time';

export async function rentalscontroller(req,res){
    const data = res.locals.data;
    const now = date.format(new Date(), 'YYYY-MM-DD');
    try {
        const game = await connection.query('SELECT "pricePerDay" FROM games WHERE id=$1',[data.gameId]);
        const originalPrice = game.rows.pricePerDay * data.daysRented;
        await connection.query('INSERT INTO rentals ("customerId","gameId","rentDate","daysRented","returnDate","originalPrice","delayFee") VALUES ($1,$2,$3,$4,$5,$6,$7)',
        [data.customerId,data.gameId,now,data.daysRented,null,originalPrice,null]);
        res.sendStatus(201);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}