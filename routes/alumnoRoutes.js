import express from 'express';
import { getAllAlumnos, getAlumnoById, addAlumno, updateAlumno, deleteAlumno } from '../controllers/alumnoController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Rutas protegidas con el middleware de verificación JWT
router.get('/', verifyToken, getAllAlumnos);
router.get('/:id', verifyToken, getAlumnoById);
router.post('/', verifyToken, addAlumno);
router.put('/:id', verifyToken, updateAlumno);
router.delete('/:id', verifyToken, deleteAlumno);

export default router;
