const express = require("express");
const router = express.Router();
const controller = require("../controllers/especialidad.controller");
const validate = require("../middlewares/validate");
const { createRules, updateRules, paramRules } = require("../middlewares/especialidad.validation");

/**
 * @swagger
 * tags:
 *   name: Especialidades
 *   description: Operaciones relacionadas con especialidades
 */

/**
 * @swagger
 * /api/especialidades:
 *   get:
 *     summary: Obtener todas las especialidades
 *     tags: [Especialidades]
 *     responses:
 *       200:
 *         description: Lista de especialidades
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   codesp:
 *                     type: string
 *                   nomesp:
 *                     type: string
 *                   costo:
 *                     type: number
 *
 *   post:
 *     summary: Crear una nueva especialidad
 *     tags: [Especialidades]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               codesp:
 *                 type: string
 *               nomesp:
 *                 type: string
 *               costo:
 *                 type: number
 *     responses:
 *       201:
 *         description: Especialidad creada
 */

/**
 * @swagger
 * /api/especialidades/{codesp}:
 *   get:
 *     summary: Obtener una especialidad por código
 *     tags: [Especialidades]
 *     parameters:
 *       - in: path
 *         name: codesp
 *         required: true
 *         schema:
 *           type: string
 *         description: Código de la especialidad
 *     responses:
 *       200:
 *         description: Especialidad encontrada
 *       404:
 *         description: Especialidad no encontrada
 *
 *   put:
 *     summary: Actualizar una especialidad
 *     tags: [Especialidades]
 *     parameters:
 *       - in: path
 *         name: codesp
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
 *               nomesp:
 *                 type: string
 *               costo:
 *                 type: number
 *     responses:
 *       200:
 *         description: Especialidad actualizada
 *
 *   delete:
 *     summary: Eliminar una especialidad
 *     tags: [Especialidades]
 *     parameters:
 *       - in: path
 *         name: codesp
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Especialidad eliminada
 */

router.get("/", controller.getAllEspecialidades);
router.get("/:codesp", paramRules, validate, controller.getEspecialidadById);
router.post("/", createRules, validate, controller.createEspecialidad);
router.put("/:codesp", paramRules, updateRules, validate, controller.updateEspecialidad);
router.delete("/:codesp", paramRules, validate, controller.deleteEspecialidad);

module.exports = router;
