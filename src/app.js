import express from 'express';
import connection from './database/database.js';
import cors from 'cors';

const app = express();
app.use(express.json());

app.get('/', async (req,res)=>{
    res.send("hello")
});

app.listen(4000, () => {
    console.log('Server is listening on port 4000.');
  });