const { z } = require('zod')

const createRequestSchema = z.object({
  title: z.string().min(1, 'El título es requerido'),
  description: z.string().optional(),
  area_id: z.number().int('El ID de área debe ser un número entero'),
  category_id: z.number().int().optional(),
// Campo priority con valores específicos y valor por defecto
  priority: z.enum(['low', 'normal', 'high']).default('normal')
})

const updateRequestSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  area_id: z.number().int().optional(),
  category_id: z.number().int().optional(),
  priority: z.enum(['low', 'normal', 'high']).optional()
})

module.exports = { createRequestSchema, updateRequestSchema }