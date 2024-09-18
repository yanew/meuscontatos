const { Client } = require('pg');

const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'root',
    password: 'root',
    database: 'meuscontatos'
});

client.connect();

exports.querysql = async (query, values) =>{
    const { rows } = await client.query(query, values);
    return rows;
}

//client.query('SELECT * FROM contato').then(resultado => console.log(resultado));
//OU client.query('SELECT * FROM contato').then(console.log);
