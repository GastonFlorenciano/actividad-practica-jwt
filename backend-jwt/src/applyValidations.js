import { validationResult } from 'express-validator';

export const applyValidations = (req, res, next) => {
  const errores = validationResult(req)

  if (!errores.isEmpty()) {

    const errors = errores.array()
    
    const errorsMap = errors.map(e => e.msg)

    return res.status(400).json(errorsMap)
}

  next()
}
