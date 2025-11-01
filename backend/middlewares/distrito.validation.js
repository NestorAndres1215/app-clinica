const { body, param } = require("express-validator");

const createRules = [
  body("coddis")
    .notEmpty().withMessage("Código obligatorio")
    .isLength({ min:3, max:3 }),
  body("nomdis")
    .notEmpty().withMessage("Nombre obligatorio")
    .isLength({ max:35 })
];

const updateRules = [
  body("nomdis")
    .optional()
    .isLength({ max:35 })
];

const paramRules = [
  param("coddis")
    .notEmpty().withMessage("Código obligatorio")
    .isLength({ min:3, max:3 })
];

module.exports = { createRules, updateRules, paramRules };
