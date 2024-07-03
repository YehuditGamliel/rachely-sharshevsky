import Joi from 'joi';

export const userSchema = Joi.object({
    userName: Joi.string().min(5).max(30).required(),    
    email: Joi.string().email().min(5).max(50).optional(), 
    password: Joi.number().min(6).required(),
    isActive: Joi.number().valid(1),
}).options({ abortEarly: false });




