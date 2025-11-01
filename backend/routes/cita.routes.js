const express = require("express");
const router = express.Router();
const controller = require("../controllers/cita.controller");
const validate = require("../middlewares/validate");
const { createRules, updateRules, paramRules } = require("../middlewares/cita.validation");
/**
 * @swagger
 * tags:
 *   name: Citas
 *   description: Operaciones relacionadas con las citas médicas
 */

/**
 * @swagger
 * /api/citas:
 *   get:
 *     summary: Obtener todas las citas
 *     tags: [Citas]
 *     responses:
 *       200:
 *         description: Lista de citas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   nrocita:
 *                     type: integer
 *                   codmed:
 *                     type: string
 *                   codpac:
 *                     type: string
 *                   tipo:
 *                     type: integer
 *                   pago:
 *                     type: number
 *                   fecha:
 *                     type: string
 *                     format: date-time
 *                   estado:
 *                     type: integer
 *                   descrip:
 *                     type: string
 *
 *   post:
 *     summary: Crear una nueva cita
 *     tags: [Citas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               codmed:
 *                 type: string
 *               codpac:
 *                 type: string
 *               tipo:
 *                 type: integer
 *               pago:
 *                 type: number
 *               fecha:
 *                 type: string
 *                 format: date-time
 *               descrip:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cita creada
 */

/**
 * @swagger
 * /api/citas/{nrocita}:
 *   get:
 *     summary: Obtener una cita por número
 *     tags: [Citas]
 *     parameters:
 *       - in: path
 *         name: nrocita
 *         required: true
 *         schema:
 *           type: integer
 *         description: Número de la cita
 *     responses:
 *       200:
 *         description: Cita encontrada
 *       404:
 *         description: Cita no encontrada
 *
 *   put:
 *     summary: Actualizar una cita
 *     tags: [Citas]
 *     parameters:
 *       - in: path
 *         name: nrocita
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               codmed:
 *                 type: string
 *               codpac:
 *                 type: string
 *               tipo:
 *                 type: integer
 *               pago:
 *                 type: number
 *               fecha:
 *                 type: string
 *                 format: date-time
 *               descrip:
 *                 type: string
 *               estado:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Cita actualizada
 *
 *   delete:
 *     summary: Eliminar una cita
 *     tags: [Citas]
 *     parameters:
 *       - in: path
 *         name: nrocita
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cita eliminada
 */

router.get("/", controller.getAllCitas);
router.get("/:nrocita", paramRules, validate, controller.getCitaById);
router.post("/", createRules, validate, controller.createCita);
router.put("/:nrocita", paramRules, updateRules, validate, controller.updateCita);
router.delete("/:nrocita", paramRules, validate, controller.deleteCita);

module.exports = router;
