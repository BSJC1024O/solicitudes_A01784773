const router = require('express').Router()
const { getAll, getById, create, update, remove } = require('../controllers/requests.controller')

// 1. Importar el middleware de autenticación (¡Esto ya lo tenías excelente!)
const { isAuthenticated } = require('../middleware/auth')

// 2. NUEVO: Importar el middleware de validación y los esquemas de Zod
const { validate } = require('../middleware/validate')
const { createRequestSchema, updateRequestSchema } = require('../schemas/requests.schema')

// Aplicar isAuthenticated a todas las rutas
router.get('/', isAuthenticated, getAll)
router.get('/:id', isAuthenticated, getById)

// 3. NUEVO: Inyectar la validación antes del controlador en POST y PUT
router.post('/', isAuthenticated, validate(createRequestSchema), create)
router.put('/:id', isAuthenticated, validate(updateRequestSchema), update)

router.delete('/:id', isAuthenticated, remove)

module.exports = router