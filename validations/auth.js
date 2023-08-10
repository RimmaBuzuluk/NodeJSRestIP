import { body } from "express-validator";

export const registerValidation=[
    body('email', 'Неправильний формат пошти').isEmail(),
    body('password', "Пароль має буту мінімум 5 символів").isLength({min:5}),
    body('fullName', "Вкажити ім'я").isLength({min:3}),
    body('avatarUrl', "Неправильне посилання на ваш аватар").optional().isURL(),
];