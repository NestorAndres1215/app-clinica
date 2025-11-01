const express = require("express");
const router = express.Router();
const controller = require("../controllers/paciente.controller");
const validate = require("../middlewares/validate");
const { createRules, updateRules, paramRules } = require("../middlewares/paciente.validation");
/**
 * @swagger
 * tags:
 *   name: Pacientes
 *   description: Operaciones relacionadas con los pacientes
 */

/**
 * @swagger
 * /api/pacientes:
 *   get:
 *     summary: Obtener todos los pacientes
 *     tags: [Pacientes]
 *     responses:
 *       200:
 *         description: Lista de pacientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   codpac:
 *                     type: string
 *                   nompac:
 *                     type: string
 *                   dnipac:
 *                     type: string
 *                   tel_cel:
 *                     type: string
 *                   dirpac:
 *                     type: string
 *                   coddis:
 *                     type: string
 *                   estado:
 *                     type: integer
 *
 *   post:
 *     summary: Crear un nuevo paciente
 *     tags: [Pacientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               codpac:
 *                 type: string
 *               nompac:
 *                 type: string
 *               dnipac:
 *                 type: string
 *               tel_cel:
 *                 type: string
 *               dirpac:
 *                 type: string
 *               coddis:
 *                 type: string
 *               estado:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Paciente creado
 */

/**
 * @swagger
 * /api/pacientes/{codpac}:
 *   get:
 *     summary: Obtener un paciente por código
 *     tags: [Pacientes]
 *     parameters:
 *       - in: path
 *         name: codpac
 *         required: true
 *         schema:
 *           type: string
 *         description: Código del paciente
 *     responses:
 *       200:
 *         description: Paciente encontrado
 *       404:
 *         description: Paciente no encontrado
 *
 *   put:
 *     summary: Actualizar un paciente
 *     tags: [Pacientes]
 *     parameters:
 *       - in: path
 *         name: codpac
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
 *               nompac:
 *                 type: string
 *               dnipac:
 *                 type: string
 *               tel_cel:
 *                 type: string
 *               dirpac:
 *                 type: string
 *               coddis:
 *                 type: string
 *               estado:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Paciente actualizado
 *
 *   delete:
 *     summary: Eliminar un paciente
 *     tags: [Pacientes]
 *     parameters:
 *       - in: path
 *         name: codpac
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Paciente eliminado
 */

router.get("/", controller.getAllPacientes);
router.get("/:codpac", paramRules, validate, controller.getPacienteById);
router.post("/", createRules, validate, controller.createPaciente);
router.put("/:codpac", paramRules, updateRules, validate, controller.updatePaciente);
router.delete("/:codpac", paramRules, validate, controller.deletePaciente);

module.exports = router;
