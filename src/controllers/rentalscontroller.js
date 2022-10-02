import connection from '../database/database.js'
import dayjs from "dayjs";

export async function getrentalscontroller(req,res){
    const customerId = Number(req.query.customerId);
    const gameId = Number(req.query.gameId);
    let rentals = null;
    try {
        if(isNaN(customerId) && isNaN(gameId)){
            rentals = await connection.query('SELECT rentals.*,customers.name as "namecustomer",games."categoryId",games.name as "gamename",categories.name as "categoryName" FROM rentals JOIN customers ON rentals."customerId"=customers.id JOIN games ON rentals."gameId"=games.id JOIN categories ON games."categoryId"=categories.id');
        }else if(isNaN(gameId)){
            rentals = await connection.query('SELECT rentals.*,customers.name as "namecustomer",games."categoryId",games.name as "gamename",categories.name as "categoryName" FROM rentals JOIN customers ON rentals."customerId"=customers.id JOIN games ON rentals."gameId"=games.id JOIN categories ON games."categoryId"=categories.id WHERE customers.id=$1',[customerId]);
        }else if(isNaN(customerId)){
            rentals = await connection.query('SELECT rentals.*,customers.name as "namecustomer",games."categoryId",games.name as "gamename",categories.name as "categoryName" FROM rentals JOIN customers ON rentals."customerId"=customers.id JOIN games ON rentals."gameId"=games.id JOIN categories ON games."categoryId"=categories.id WHERE games.id=$1',[gameId]);
        }else{
            rentals = await connection.query('SELECT rentals.*,customers.name as "namecustomer",games."categoryId",games.name as "gamename",categories.name as "categoryName" FROM rentals JOIN customers ON rentals."customerId"=customers.id JOIN games ON rentals."gameId"=games.id JOIN categories ON games."categoryId"=categories.id WHERE games.id=$1 AND customers.id=$2',[gameId,customerId]);
        }
        for(let i=0; i<rentals.rows.length; i++){
            rentals.rows[i] = {
                customerId: rentals.rows[i].customerId,
                gameId: rentals.rows[i].gameId,
                rentDate: rentals.rows[i].rentDate,
                daysRented: rentals.rows[i].daysRented,
                returnDate: rentals.rows[i].returnDate,
                originalPrice: rentals.rows[i].originalPrice,
                delayFee: rentals.rows[i].delayFee,
                customer:{
                    id: rentals.rows[i].customerId,
                    name: rentals.rows[i].namecostumer
                },
                game:{
                    id: rentals.rows[i].gameId,
                    name: rentals.rows[i].gamename,
                    categoryId: rentals.rows[i].categoryId,
                    categoryName: rentals.rows[i].categoryName
                }
            }
        }
        res.send(rentals.rows);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}
export async function postrentalscontroller(req,res){
    const data = res.locals.data;
    const now = dayjs().format('YYYY-MM-DD');
    try {
        const game = await connection.query('SELECT "pricePerDay" FROM games WHERE id=$1',[data.gameId]);
        const originalPrice = game.rows[0].pricePerDay * data.daysRented;
        await connection.query('INSERT INTO rentals ("customerId","gameId","rentDate","daysRented","returnDate","originalPrice","delayFee") VALUES ($1,$2,$3,$4,$5,$6,$7)',
        [data.customerId,data.gameId,now,data.daysRented,null,originalPrice,null]);
        res.sendStatus(201);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}