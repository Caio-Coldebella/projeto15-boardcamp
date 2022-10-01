import connection from '../database/database.js'

export const getcategoriescontroller = async (req,res) => {
    try {
        const result = await connection.query('SELECT * FROM categories');
        res.send(result.rows);   
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

export const postcategoriescontroller = async (req,res) => {
    const data = res.locals.data;
    try {
        await connection.query('INSERT INTO categories (name) VALUES ($1)',[data.name]);
        res.sendStatus(201);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }    
}