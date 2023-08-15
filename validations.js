import { body } from "express-validator";

export const loginValidation=[
    body('email', 'Wrong mail format').isEmail(),
    body('password', "The password must be at least 5 characters long").isLength({min:5}),
];

export const registerValidation=[
    body('email', 'Wrong mail format').isEmail(),
    body('password', "The password must be at least 5 characters long").isLength({min:5}),
    body('fullName', "Enter name").isLength({min:3}),
    body('avatarUrl', "Your avatar link is incorrect").optional().isURL(),
];

export const postCreateValidation = [
    body('title', 'Введите заголовок статьи').isLength({ min: 3 }).isString(),
    body('text', 'Введите текст статьи').isLength({ min: 3 }).isString(),
    body('tags', 'Неверный формат тэгов').optional().isString(),
    body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
  ];