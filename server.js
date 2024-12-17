import express from 'express';
import dotenv from 'dotenv';
import alumnoRoutes from './routes/alumnoRoutes.js';
import authRoutes from './routes/authRoutes.js';
import swaggerUI from 'swagger-ui-express';
import specs from './swagger/swagger.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware para JSON
app.use(express.json());


app.use(cors());
// Configuración de CORS (ajusta a tu necesidad)
app.use(cors({
    origin: 'https://alumnoextra.onrender.com', // URL donde se encuentra Swagger
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Permite enviar cookies o credenciales
}));

// Documentación Swagger    
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

// Rutas
app.use('/api/auth', authRoutes); // Ruta donde registras tu login
app.use('/api/alumnos', alumnoRoutes);

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});

