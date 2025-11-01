const { body, param } = require("express-validator");

const createRules = [
  body("codpac")
    .notEmpty().withMessage("Código obligatorio")
    .isLength({ min:6, max:6 }),
  body("nompac")
    .notEmpty().withMessage("Nombre obligatorio")
    .isLength({ max:50 }),
  body("dnipac")
    .optional()
    .isLength({ min:8, max:8 }),
  body("tel_cel")
    .optional()
    .isLength({ max:10 }),
  body("dirpac")
    .optional()
    .isLength({ max:50 }),
  body("coddis")
    .optional()
    .isLength({ min:3, max:3 }),
  body("estado")
    .optional()
    .isInt()
];

const updateRules = [
  body("nompac").optional().isLength({ max:50 }),
  body("tel_cel").optional().isLength({ max:10 }),
  body("estado").optional().isInt()
];

const paramRules = [
  param("codpac")
    .notEmpty().withMessage("Código obligatorio")
    .isLength({ min:6, max:6 })
];

module.exports = { createRules, updateRules, paramRules };
