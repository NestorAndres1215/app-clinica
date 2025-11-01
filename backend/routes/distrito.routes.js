const express = require("express");
const router = express.Router();
const controller = require("../controllers/distrito.controller");
const validate = require("../middlewares/validate");
const { createRules, updateRules, paramRules } = require("../middlewares/distrito.validation");

/**
 * @swagger
 * tags:
 *   name: Distritos
 *   description: Operaciones relacionadas con distritos
 */

/**
 * @swagger
 * /api/distritos:
 *   get:
 *     summary: Obtener todos los distritos
 *     tags: [Distritos]
 *     responses:
 *       200:
 *         description: Lista de distritos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   coddis:
 *                     type: string
 *                   nomdis:
 *                     type: string
 *
 *   post:
 *     summary: Crear un nuevo distrito
 *     tags: [Distritos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               coddis:
 *                 type: string
 *               nomdis:
 *                 type: string
 *     responses:
 *       201:
 *         description: Distrito creado
 */

/**
 * @swagger
 * /api/distritos/{coddis}:
 *   get:
 *     summary: Obtener un distrito por código
 *     tags: [Distritos]
 *     parameters:
 *       - in: path
 *         name: coddis
 *         required: true
 *         schema:
 *           type: string
 *         description: Código del distrito
 *     responses:
 *       200:
 *         description: Distrito encontrado
 *       404:
 *         description: Distrito no encontrado
 *
 *   put:
 *     summary: Actualizar un distrito
 *     tags: [Distritos]
 *     parameters:
 *       - in: path
 *         name: coddis
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
 *               nomdis:
 *                 type: string
 *     responses:
 *       200:
 *         description: Distrito actualizado
 *
 *   delete:
 *     summary: Eliminar un distrito
 *     tags: [Distritos]
 *     parameters:
 *       - in: path
 *         name: coddis
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Distrito eliminado
 */

router.get("/", controller.getAllDistritos);
router.get("/:coddis", paramRules, validate, controller.getDistritoById);
router.post("/", createRules, validate, controller.createDistrito);
router.put("/:coddis", paramRules, updateRules, validate, controller.updateDistrito);
router.delete("/:coddis", paramRules, validate, controller.deleteDistrito);

module.exports = router;
