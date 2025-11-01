const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

require("dotenv").config();
require("./config/db"); // Conecta a la base de datos

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Rutas
const especialidadRoutes = require("./routes/especialidad.routes");
const distritoRoutes = require("./routes/distrito.routes");
const medicoRoutes = require("./routes/medico.routes");
const pacienteRoutes = require("./routes/paciente.routes");
const citaRoutes = require("./routes/cita.routes");

app.use("/api/especialidades", especialidadRoutes);
app.use("/api/distritos", distritoRoutes);
app.use("/api/medicos", medicoRoutes);
app.use("/api/pacientes", pacienteRoutes);
app.use("/api/citas", citaRoutes);

// Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API Clínica",
      version: "1.0.0",
      description: "API para gestionar clínica",
    },
    servers: [{ url: `http://localhost:${process.env.PORT || 3000}` }],
  },
  apis: ["./routes/**/*.js", "./controllers/**/*.js"], // detecta rutas y controladores
};


const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Ruta principal
app.get("/", (req, res) => {
  res.send("Bienvenido a la API Clínica");
});

// Middleware de error 404
app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

module.exports = app;
