const { body, param } = require("express-validator");

const createRules = [
  body("codmed")
    .notEmpty().withMessage("Código de médico obligatorio")
    .isLength({ min:5, max:5 }),
  body("codpac")
    .notEmpty().withMessage("Código de paciente obligatorio")
    .isLength({ min:6, max:6 }),
  body("tipo")
    .optional()
    .isInt(),
  body("pago")
    .optional()
    .isDecimal(),
  body("fecha")
    .optional()
    .isISO8601().toDate(),
  body("estado")
    .optional()
    .isInt(),
  body("descrip")
    .optional()
    .isLength({ max:400 })
];

const updateRules = [
  body("tipo").optional().isInt(),
  body("pago").optional().isDecimal(),
  body("estado").optional().isInt(),
  body("descrip").optional().isLength({ max:400 })
];

const paramRules = [
  param("nrocita")
    .notEmpty().withMessage("Número de cita obligatorio")
    .isInt()
];

module.exports = { createRules, updateRules, paramRules };
