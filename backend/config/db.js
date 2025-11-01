const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,       // Nombre de la base de datos
  process.env.DB_USER,       // Usuario
  process.env.DB_PASSWORD,   // Contraseña
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    logging: false,           // Cambia a true si quieres ver logs de SQL
    define: {
      freezeTableName: true   // Evita que Sequelize pluralice los nombres de las tablas
    }
  }
);

// Test de conexión
sequelize.authenticate()
  .then(() => console.log("✅ Conectado a MySQL correctamente"))
  .catch(err => console.error("❌ Error de conexión:", err));

module.exports = sequelize;
