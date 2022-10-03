import connection from '../database/database.js'
import dayjs from "dayjs";
import Math from "math";

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
                ...rentals.rows[i],
                customer:{
                    id: rentals.rows[i].customerId,
                    name: rentals.rows[i].namecustomer
                },
                game:{
                    id: rentals.rows[i].gameId,
                    name: rentals.rows[i].gamename,
                    categoryId: rentals.rows[i].categoryId,
                    categoryName: rentals.rows[i].categoryName
                }
            };
            delete rentals.rows[i].namecustomer;
            delete rentals.rows[i].categoryId;
            delete rentals.rows[i].gamename;
            delete rentals.rows[i].categoryName;
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
export async function endrentalscontroller(req,res){
    const id = req.params.id;
    try {
        const rent = await connection.query('SELECT * FROM rentals WHERE id=$1',[id]);
        if(!rent.rows){
            res.sendStatus(404);
            return;
        }else if(rent.rows[0].returnDate != null){
            res.sendStatus(400);
            return;
        }
        const returnDate = dayjs().format('YYYY-MM-DD');
        const diff = Math.abs(dayjs().diff(rent.rows[0].rentDate,'day'));
        const difference = diff - rent.rows[0].daysRented;
        let delay = 0;
        if(difference > 0){
            const orig = rent.rows[0].originalPrice;
            const price = orig / rent.rows[0].daysRented;
            delay = price * difference;
        }
        await connection.query('UPDATE rentals SET "returnDate"=$1,"delayFee"=$2 WHERE id=$3',[returnDate,delay,id]);
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

export async function deleterentalscontroller(req,res){
    const id = req.params.id;
    try {
        const rental = await connection.query('SELECT * FROM rentals WHERE id=$1',[id]);
        if(!rental.rows){
            res.sendStatus(404);
            return;
        }
        if(rental.rows[0].returnDate === null){
            res.sendStatus(400);
            return;
        }
        await connection.query('DELETE FROM rentals WHERE id=$1',[id]);
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}