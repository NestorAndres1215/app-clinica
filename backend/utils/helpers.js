/**
 * Helper para formatear fechas a "DD/MM/YYYY"
 * @param {Date} date
 * @returns {string}
 */
const formatDate = (date) => {
  if (!date) return null;
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0"); // Mes empieza en 0
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

/**
 * Helper para manejar errores de forma estándar
 * @param {Error} err
 * @param {Response} res
 * @param {number} code
 */
const handleError = (err, res, code = 500) => {
  console.error(err);
  res.status(code).json({
    error: err.message || "Error desconocido",
  });
};

/**
 * Helper para validar si un valor no es nulo ni vacío
 * @param {any} value
 * @returns {boolean}
 */
const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "string" && value.trim() === "") ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === "object" && Object.keys(value).length === 0)
  );
};

/**
 * Helper para redondear números decimales
 * @param {number} num
 * @param {number} decimals
 * @returns {number}
 */
const roundDecimal = (num, decimals = 2) => {
  return Number(Math.round(num + "e" + decimals) + "e-" + decimals);
};

module.exports = {
  formatDate,
  handleError,
  isEmpty,
  roundDecimal
};
