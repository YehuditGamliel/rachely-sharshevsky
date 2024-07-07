import Joi from 'joi';

export const eyeglassesSchema = Joi.object({
  title: Joi.string().max(45),
  color: Joi.string().max(10),
  stock: Joi.number().integer(),
  description: Joi.string().max(100),
  BridgeWidth: Joi.number().integer(),
  lensWidth: Joi.number().integer(),
  company: Joi.string().max(15),
  material: Joi.string().max(10),
  imgDisplay:Joi.string().max(100),
  imgCamara:Joi.string().max(100),
  price:Joi.number().integer().required(),
  
}).options({ abortEarly: false });

