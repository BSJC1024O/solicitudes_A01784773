const validate = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body)
    
    if (!result.success) {
      return res.status(400).json({ errors: result.error.flatten().fieldErrors })
    }
    
    // Asignamos la data limpia devuelta por Zod a req.body
    req.body = result.data
    next()
  }
  
  module.exports = { validate }