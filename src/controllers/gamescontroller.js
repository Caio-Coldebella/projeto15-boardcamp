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