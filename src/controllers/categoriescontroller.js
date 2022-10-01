import connection from '../database/database.js'

export async function getcategoriescontroller(req,res){
    try {
        const result = await connection.query('SELECT * FROM categories');
        res.send(result.rows);   
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}