const connection = require('../config/database');

const Alumno = {
    getAll: (callback) => {
        connection.query('SELECT * FROM Alumno', callback);
    },
    getById: (id, callback) => {
        connection.query('SELECT * FROM Alumno WHERE id_alumno = ?', [id], callback);
    },
    create: (data, callback) => {
        const sql = 'INSERT INTO Alumno (nombre, apellido, email, password, sexo, fechaNacimiento, peso, altura, descuento, comidaFavorita) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const params = [
            data.nombre, data.apellido, data.email, data.password, data.sexo,
            data.fechaNacimiento, data.peso, data.altura, data.descuento, data.comidaFavorita
        ];
        connection.query(sql, params, callback);
    },
    update: (id, data, callback) => {
        const sql = `UPDATE Alumno SET nombre=?, apellido=?, email=?, password=?, sexo=?, fechaNacimiento=?, peso=?, altura=?, descuento=?, comidaFavorita=? WHERE id_alumno=?`;
        const params = [
            data.nombre, data.apellido, data.email, data.password, data.sexo,
            data.fechaNacimiento, data.peso, data.altura, data.descuento, data.comidaFavorita, id
        ];
        connection.query(sql, params, callback);
    },
    delete: (id, callback) => {
        connection.query('DELETE FROM Alumno WHERE id_alumno = ?', [id], callback);
    }
};

module.exports = Alumno;
