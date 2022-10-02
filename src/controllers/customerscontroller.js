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
        res.send(cust.rows[0]);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}
export async function postcustomers(req,res){
    const data = res.locals.data;
    try {
        await connection.query('INSERT INTO customers (name,phone,cpf,birthday) VALUES ($1,$2,$3,$4)',
        [data.name,data.phone,data.cpf,data.birthday]);
        res.sendStatus(201);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}
export async function putcostumers(req,res){
    const data = res.locals.data;
    const id = res.locals.id;
    try {
        await connection.query('UPDATE costumers name=$1,phone=$2,cpf=$3,birthday=$4 WHERE id=$5',
        [data.name,data.phone,data.cpf,data.birthday,id]);
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}