import { body, param } from "express-validator";

export const validateAddToCart = [
    body('productId')
    .isInt({min:1})
    .withMessage('Product ID must be a positive integer')
    .toInt(),
    body('quantity')
    .optional()
    .isInt({min: 1})
    .withMessage('Quantity must be at least 1')
    .toInt()
];

export const validateUpdateCartItem = [
    param('itemId')
    .isInt({min: 1})
    .withMessage('Cart item ID must be a positive integer')
    .toInt(),
    body('quantity')
    .isInt({min: 1})
    .withMessage('Quantity must be at least 1')
    .toInt()
];

export const validateCartItemId =[
    param('itemId')
    .isInt({min: 1})
    .withMessage('Cart item ID must be a positive integer')
    .toInt()
]; 