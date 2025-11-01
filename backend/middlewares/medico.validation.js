const { body, param } = require("express-validator");

const createRules = [
  body("codmed")
    .notEmpty().withMessage("Código obligatorio")
    .isLength({ min:5, max:5 }).withMessage("Debe tener 5 caracteres"),
  body("codesp")
    .notEmpty().withMessage("Código de especialidad obligatorio")
    .isLength({ min:3, max:3 }),
  body("nommed")
    .notEmpty().withMessage("Nombre obligatorio")
    .isLength({ max:40 }),
  body("anio_colegio")
    .optional()
    .isInt().withMessage("Debe ser un número entero"),
  body("coddis")
    .optional()
    .isLength({ min:3, max:3 }),
  body("estado")
    .optional()
    .isInt()
];

const updateRules = [
  body("nommed").optional().isLength({ max:40 }),
  body("anio_colegio").optional().isInt(),
  body("estado").optional().isInt()
];

const paramRules = [
  param("codmed")
    .notEmpty().withMessage("Código obligatorio")
    .isLength({ min:5, max:5 })
];

module.exports = { createRules, updateRules, paramRules };
