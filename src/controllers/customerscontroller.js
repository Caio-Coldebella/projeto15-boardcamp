import connection from '../database/database.js'

export async function getcustomers(req,res){
    const cpf = req.query.cpf;
    try {
        if(cpf!= undefined){
            const cust = await connection.query(`SELECT * FROM customers WHERE cpf LIKE('${cpf}%')`);
            res.send(cust.rows);
        }else{
            const cust = await connection.query('SELECT * FROM customers');
            res.send(cust.rows);
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

export async function getbyid(req,res){
    const id = req.params.id;
    try {
        const cust = await connection.query('SELECT * FROM customers WHERE id=$1',[id]);
        res.send(cust.rows);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}