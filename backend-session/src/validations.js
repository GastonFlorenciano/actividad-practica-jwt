import { body } from 'express-validator';

export const validationsForm = [

    body("username")
        .isString().withMessage("El Nombre de Usuario debe ser de tipo string")
        .notEmpty().withMessage("El Nombre de Usuario no debe estar vacío"),
    body("password")
        .isString().withMessage("La Contraseña debe ser de tipo string")
        .notEmpty().withMessage("La Contraseña no debe estar vacía")

]