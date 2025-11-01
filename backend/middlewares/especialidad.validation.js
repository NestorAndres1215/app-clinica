const { body, param } = require("express-validator");

const createRules = [
  body("codesp")
    .notEmpty().withMessage("Código obligatorio")
    .isLength({ min:3, max:3 }).withMessage("Debe tener 3 caracteres"),
  body("nomesp")
    .notEmpty().withMessage("Nombre obligatorio")
    .isLength({ max:40 }).withMessage("Máx 40 caracteres"),
  body("costo")
    .notEmpty().withMessage("Costo obligatorio")
    .isDecimal().withMessage("Debe ser un número decimal")
];

const updateRules = [
  body("nomesp")
    .optional()
    .isLength({ max:40 }).withMessage("Máx 40 caracteres"),
  body("costo")
    .optional()
    .isDecimal().withMessage("Debe ser un número decimal")
];

const paramRules = [
  param("codesp")
    .notEmpty().withMessage("Código obligatorio")
    .isLength({ min:3, max:3 }).withMessage("Debe tener 3 caracteres")
];

module.exports = { createRules, updateRules, paramRules };
