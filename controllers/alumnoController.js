import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

/**
 * @swagger
 * components:
 *   schemas:
 *     Alumno:
 *       type: object
 *       properties:
 *         id_alumno:
 *           type: integer
 *           description: ID único del alumno
 *         nombre:
 *           type: string
 *           description: Nombre del alumno
 *         apellido:
 *           type: string
 *           description: Apellido del alumno
 *         email:
 *           type: string
 *           format: email
 *           description: Correo electrónico del alumno
 *         password:
 *           type: string
 *           description: Contraseña del alumno
 *         sexo:
 *           type: string
 *           enum:
 *             - masculino
 *             - femenino
 *             - otro
 *           description: Sexo del alumno
 *         fechaNacimiento:
 *           type: string
 *           format: date
 *           description: Fecha de nacimiento del alumno
 *         peso:
 *           type: number
 *           format: float
 *           description: Peso del alumno en kilogramos
 *         altura:
 *           type: number
 *           format: float
 *           description: Altura del alumno en metros
 *         descuento:
 *           type: number
 *           format: float
 *           description: Descuento asignado al alumno
 *         comidaFavorita:
 *           type: string
 *           description: Comida favorita del alumno
 *       required:
 *         - nombre
 *         - apellido
 *         - email
 *         - password
 *         - sexo
 *         - descuento
 *         - comidaFavorita
 */












/**
 * @swagger
 * /api/alumnos:
 *   get:
 *     summary: Obtener todos los alumnos con paginación
 *     description: Devuelve una lista de alumnos con soporte de paginación utilizando los parámetros "page" y "limit".
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *           minimum: 1
 *         description: Número de la página para la paginación (valor por defecto es 1).
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *           minimum: 1
 *         description: Número de registros por página (valor por defecto es 50).
 *     responses:
 *       200:
 *         description: Lista paginada de alumnos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Alumno'
 *       400:
 *         description: Parámetros de paginación inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Parámetros inválidos para paginación."
 *       500:
 *         description: Error interno al obtener los datos de los alumnos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al obtener los datos de los alumnos."
 *                 details:
 *                   type: string
 *                   example: "Mensaje detallado del error."
 */


export const getAllAlumnos = async (req, res) => {
    const page = parseInt(req.query.page, 10) || 1; // Convertir a entero base 10
    const limit = parseInt(req.query.limit, 10) || 50;

    const offset = (page - 1) * limit;

    try {
        if (isNaN(limit) || isNaN(offset) || limit <= 0 || offset < 0) {
            return res.status(400).json({ error: 'Parámetros inválidos para paginación.' });
        }

        const connection = await mysql.createConnection(dbConfig);
        // Inserta los valores directamente como enteros en la cadena SQL
        const [rows] = await connection.execute(
            `SELECT * FROM Alumno LIMIT ${mysql.escape(limit)} OFFSET ${mysql.escape(offset)}`
        );
        await connection.end();

        res.json(rows);
    } catch (error) {
        console.error('Error en getAllAlumnos:', error.message);
        res.status(500).json({ error: 'Error al obtener los datos de los alumnos.', details: error.message });
    }
};















/**
 * @swagger
 * /api/alumnos/{id}:
 *   get:
 *     summary: Obtener un alumno por ID
 *     description: Devuelve los datos de un alumno específico por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del alumno
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Alumno encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Alumno'
 *       404:
 *         description: Alumno no encontrado
 *       500:
 *         description: Error al obtener el alumno
 */


// Obtener un alumno por ID
export const getAlumnoById = async (req, res) => {
    const { id } = req.params;
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT * FROM Alumno WHERE id_alumno = ?', [id]);
        await connection.end();

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Alumno no encontrado.' });
        }

        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el alumno.' });
    }
};

/**
 * @swagger
 * /api/alumnos:
 *   post:
 *     summary: Añadir un nuevo alumno
 *     description: Crea un nuevo alumno en la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Alumno'
 *     responses:
 *       201:
 *         description: Alumno añadido correctamente
 *       400:
 *         description: Datos incompletos
 *       500:
 *         description: Error al añadir el alumno
 */
// Añadir un nuevo alumno
export const addAlumno = async (req, res) => {
    const { nombre, apellido, email, password, sexo, fechaNacimiento, peso, altura, descuento, comidaFavorita } = req.body;

    if (!nombre || !apellido || !email || !password || !sexo || !descuento || !comidaFavorita) {
        return res.status(400).json({ error: 'Todos los campos obligatorios deben ser completados.' });
    }

    try {
        const connection = await mysql.createConnection(dbConfig);
        const query = `
            INSERT INTO Alumno (nombre, apellido, email, password, sexo, fechaNacimiento, peso, altura, descuento, comidaFavorita)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [nombre, apellido, email, password, sexo, fechaNacimiento, peso, altura, descuento, comidaFavorita];
        const [result] = await connection.execute(query, values);
        await connection.end();

        res.status(201).json({ message: 'Alumno añadido exitosamente.', id: result.insertId });
    } catch (error) {
        console.error('Error en addAlumno:', error.message); // Registra el error en consola para depuración
        // Si el entorno es de desarrollo, muestra el mensaje completo del error
        if (process.env.NODE_ENV === 'development') {
            return res.status(500).json({ error: error.message }); // Solo en desarrollo
        }
        // En producción, muestra un mensaje genérico
        res.status(500).json({ error: 'Error al añadir el alumno.' });
    }
    
    
};



/**
 * @swagger
 * /api/alumnos/{id}:
 *   put:
 *     summary: Modificar un alumno existente
 *     description: Actualiza los datos de un alumno específico por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del alumno
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Alumno'
 *     responses:
 *       200:
 *         description: Alumno actualizado exitosamente
 *       404:
 *         description: Alumno no encontrado
 *       500:
 *         description: Error al actualizar el alumno
 */

// Modificar un alumno existente
export const updateAlumno = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, email, password, sexo, fechaNacimiento, peso, altura, descuento, comidaFavorita } = req.body;

    try {
        const connection = await mysql.createConnection(dbConfig);
        const query = `
            UPDATE Alumno
            SET nombre = ?, apellido = ?, email = ?, password = ?, sexo = ?, fechaNacimiento = ?, peso = ?, altura = ?, descuento = ?, comidaFavorita = ?
            WHERE id_alumno = ?
        `;
        const values = [nombre, apellido, email, password, sexo, fechaNacimiento, peso, altura, descuento, comidaFavorita, id];
        const [result] = await connection.execute(query, values);
        await connection.end();

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Alumno no encontrado.' });
        }

        res.json({ message: 'Alumno actualizado exitosamente.' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el alumno.' });
    }
};



/**
 * @swagger
 * /api/alumnos/{id}:
 *   delete:
 *     summary: Eliminar un alumno
 *     description: Elimina un alumno específico por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del alumno
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Alumno eliminado exitosamente
 *       404:
 *         description: Alumno no encontrado
 *       500:
 *         description: Error al eliminar el alumno
 */

// Eliminar un alumno
export const deleteAlumno = async (req, res) => {
    const { id } = req.params;

    try {
        const connection = await mysql.createConnection(dbConfig);
        const [result] = await connection.execute('DELETE FROM Alumno WHERE id_alumno = ?', [id]);
        await connection.end();

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Alumno no encontrado.' });
        }

        res.json({ message: 'Alumno eliminado exitosamente.' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el alumno.' });
    }
};
