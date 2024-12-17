import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Autenticación de usuario y generación de token JWT.
 *     description: Esta ruta permite autenticar un usuario basado en sus credenciales (usuario y contraseña) y generar un token JWT.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: El nombre de usuario del usuario.
 *                 example: user1
 *               password:
 *                 type: string
 *                 description: La contraseña del usuario.
 *                 example: password123
 *     responses:
 *       200:
 *         description: Usuario autenticado exitosamente y se generó el token JWT.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: El token JWT generado.
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXIxIn0.mhCp1gPfsK0HxFS0Vu8PZ4Dq_L_rn9Nmz...
 *       401:
 *         description: Credenciales inválidas proporcionadas.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid credentials.
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error.
 */

export const login = (req, res) => {
    const { username, password } = req.body;

    if (username !== process.env.AUTH_USER || password !== process.env.AUTH_PASSWORD) {
        return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const token = jwt.sign({ id: username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
};
