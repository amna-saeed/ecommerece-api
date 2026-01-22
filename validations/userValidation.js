import {body, param, query} from 'express-validator';

export const validateRegister = [
    body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
    body('password')
    .isLength({min: 5, max: 50})
    .withMessage('Password should be between 5 and 50 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
    body('first_name')
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .isLength({min:3, max:50})
    .withMessage('First name should be between 3 and 50 characters'),
    body('last_name')
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({min:3, max:50})
    .withMessage('Last name should be between 3 and 50 characters')
]

// login
export const validationLogin = [
    body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
    body('password')
    .notEmpty()
    .withMessage('Password is required')
]

// profile update
export const validateUpdate = [
    body('first_name')
    .optional()
    .trim()
    .isLength({min:3, max:50})
    .withMessage('First name should be between 3 and 50 characters'),
    body('last_name')
    .optional()
    .isLength({min:3, max:50})
    .withMessage('Last name should be between 3 and 50 characters')
]

export const validateUserId = [
    param('id')
    .isInt({min: 1})
    .withMessage('User id must be positive integer')
    .toInt()
]   

export const validateChangePassword = [
    body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
    body('newPassword')
    .isLength({min: 5, max:50})
    .withMessage('Password should be between 5 and 50 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
    
]