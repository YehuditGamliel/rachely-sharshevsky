import { model } from '@tensorflow/tfjs';
import Joi from 'joi';


export const purchaseSchema = Joi.object({
    SPHRight: Joi.number(),
    SPHLeft: Joi.number(),
    CYLRight: Joi.number(),
    CYLLeft: Joi.number(),
    PDFAR: Joi.number().min(40).max(80),
    PDNEAR: Joi.number().min(40).max(80),
    idKindOfGlasses: Joi.number().min(1).max(4),
    idCU6: Joi.number().min(1).max(4),
    idKindOfPrescription: Joi.number().min(1).max(4),
    price: Joi.number().required(),
    status: Joi.number().required(),
    model: Joi.string().required(),
    userName: Joi.string().min(2).max(30).required(),
    stock: Joi.number().required(),
}).options({ abortEarly: false });