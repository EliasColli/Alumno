import swaggerJsdoc from 'swagger-jsdoc'; // Importación correcta para ES Modules
import swaggerUi from 'swagger-ui-express'; // Importación de Swagger UI Express

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Extraordinario',
      version: '1.0.0',
      description: 'Documentancion y funcionamiento de la API',
      contact: {
        name: 'Developer',
      },
    },
    servers: [
      { 
        url: 'https://alumnoextra.onrender.com',
        description: 'Local server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT', // Esto indica que es un token JWT
        },
      },
    },
    security: [
      {
        bearerAuth: [], // Aplica el esquema de seguridad a todas las rutas
      },
    ],
  },
  apis: ['./routes/*.js', './controllers/*.js', './server.js'], // Asegúrate de que las rutas a los archivos estén bien escritas
};


const specs = swaggerJsdoc(options);
export default specs;

