const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: false,  // Puedes ajustarlo dependiendo de la configuración de Clever Cloud
    },
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Conectado a la base de datos.');
});

module.exports = connection;