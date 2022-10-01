import connection from '../database/database.js'

export async function getgames(req,res){
    const name = req.query.name;
    try {
        if(name!= undefined){
            const games = await connection.query(`SELECT * FROM games WHERE name LIKE('${name}%')`);
            res.send(games.rows);
        }else{
            const games = await connection.query('SELECT * FROM games');
            res.send(games.rows);
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

export async function postgames(req,res){
    const data = res.locals.data;
    try {
        await connection.query('INSERT INTO games (name,image,"stockTotal","categoryId","pricePerDay") VALUES ($1,$2,$3,$4,$5)',
        [data.name,data.image,data.stockTotal,data.categoryId,data.pricePerDay]);
        res.sendStatus(201);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}