import Joi from "joi";

export const registerUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
}).error(new Error('Помилка від Joi або іншої бібліотеки валідації'));

export const loginUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
}).error(new Error('Помилка від Joi або іншої бібліотеки валідації'));

// .error(new Error('Помилка від Joi або іншої бібліотеки валідації'))
