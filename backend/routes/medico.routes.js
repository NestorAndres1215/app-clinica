const express = require("express");
const router = express.Router();
const controller = require("../controllers/medico.controller");
const validate = require("../middlewares/validate");
const { createRules, updateRules, paramRules } = require("../middlewares/medico.validation");

/**
 * @swagger
 * tags:
 *   name: Medicos
 *   description: Operaciones relacionadas con los médicos
 */

/**
 * @swagger
 * /api/medicos:
 *   get:
 *     summary: Obtener todos los médicos
 *     tags: [Medicos]
 *     responses:
 *       200:
 *         description: Lista de médicos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   codmed:
 *                     type: string
 *                   codesp:
 *                     type: string
 *                   nommed:
 *                     type: string
 *                   anio_colegio:
 *                     type: integer
 *                   coddis:
 *                     type: string
 *                   estado:
 *                     type: integer
 *
 *   post:
 *     summary: Crear un nuevo médico
 *     tags: [Medicos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               codmed:
 *                 type: string
 *               codesp:
 *                 type: string
 *               nommed:
 *                 type: string
 *               anio_colegio:
 *                 type: integer
 *               coddis:
 *                 type: string
 *               estado:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Médico creado
 */

/**
 * @swagger
 * /api/medicos/{codmed}:
 *   get:
 *     summary: Obtener un médico por código
 *     tags: [Medicos]
 *     parameters:
 *       - in: path
 *         name: codmed
 *         required: true
 *         schema:
 *           type: string
 *         description: Código del médico
 *     responses:
 *       200:
 *         description: Médico encontrado
 *       404:
 *         description: Médico no encontrado
 *
 *   put:
 *     summary: Actualizar un médico
 *     tags: [Medicos]
 *     parameters:
 *       - in: path
 *         name: codmed
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               codesp:
 *                 type: string
 *               nommed:
 *                 type: string
 *               anio_colegio:
 *                 type: integer
 *               coddis:
 *                 type: string
 *               estado:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Médico actualizado
 *
 *   delete:
 *     summary: Eliminar un médico
 *     tags: [Medicos]
 *     parameters:
 *       - in: path
 *         name: codmed
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Médico eliminado
 */

router.get("/", controller.getAllMedicos);
router.get("/:codmed", paramRules, validate, controller.getMedicoById);
router.post("/", createRules, validate, controller.createMedico);
router.put("/:codmed", paramRules, updateRules, validate, controller.updateMedico);
router.delete("/:codmed", paramRules, validate, controller.deleteMedico);

module.exports = router;
