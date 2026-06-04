const router = require('express').Router()
const { getAll, getById, create, update, remove } = require('../controllers/areas.controller')

// 1. Importar los middlewares de autenticación y autorización
const { isAuthenticated } = require('../middleware/auth')
const { checkRole } = require('../middleware/authorize')

// 2. NUEVO: Importar el middleware de validación y los esquemas de Áreas
const { validate } = require('../middleware/validate')
const { createAreaSchema, updateAreaSchema } = require('../schemas/areas.schema')

// Aplicar autenticación global para TODO este archivo de rutas
router.use(isAuthenticated)

// Rutas de lectura (Cualquier usuario logueado puede entrar)
router.get('/', getAll)
router.get('/:id', getById)

// Rutas de escritura (Solo admins + validación de datos de Zod)
// Nota: Ponemos validate después de checkRole para que solo valide si el usuario realmente es admin
router.post('/', checkRole('admin'), validate(createAreaSchema), create)
router.put('/:id', checkRole('admin'), validate(updateAreaSchema), update)
router.delete('/:id', checkRole('admin'), remove)

module.exports = router