import { model } from '@tensorflow/tfjs';
import Joi from 'joi';

//Custom validation function to check if a string is a valid numbe
const validateStringNumber = (value, helpers) => {
    const numberValue = Number(value);
    console.log("numberValue",numberValue)
    if (!isNaN(numberValue)) {
        return numberValue;
    } else {
        return helpers.error('string.number');
    }
};

export const purchaseSchema = Joi.object({
    SPHRight: Joi.string().custom(validateStringNumber),
    SPHLeft: Joi.string().custom(validateStringNumber),
    CYLRight: Joi.string().custom(validateStringNumber),
    CYLLeft: Joi.string().custom(validateStringNumber),
    PDFAR: Joi.string().custom(validateStringNumber),
    PDNEAR: Joi.string().custom(validateStringNumber),
    idKindOfGlasses: Joi.number().min(1).max(4),
    idCU6: Joi.number().min(1).max(4),
    idKindOfPrescription: Joi.number().min(1).max(4),
    price: Joi.number(),
    status: Joi.string().custom(validateStringNumber).min(1).max(3),
    model: Joi.string(),
    userName: Joi.string().min(5).max(30).required(),
    stock: Joi.number().required(),
}).options({ abortEarly: false });