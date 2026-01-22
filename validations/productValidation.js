import {body, param, query} from 'express-validator'

export const validateProductId = [
    param('id')
    .isInt({min: 1})
    .withMessage('Product id must be a positive integer')
    .toInt()
]

export const validateCreateProduct =[
    body('name')
    .trim()
    .notEmpty()
    .withMessage('Product name is required')
    .isLength({min: 2, max: 200})
    .withMessage('Product name should be between 2 and 200 characters'),
    body('slug')
    .trim()
    .optional()
    .isLength({min: 2, max:250})
    .withMessage('Slug should be between 2 and 250 characters'),
    body('description')
    .trim()
    .optional(),
    body('shortDescription')
    .trim()
    .optional()
    .isLength({max:500})
    .withMessage('Short description should not exceed 500 characters'),
    body('price')
    .isFloat({min: 0})
    .withMessage('Price must be a positive number'),
    body('comparePrice')
    .optional()
    .isFloat({min: 0})
    .withMessage('Compare price must be a positive number'),
    body('sku')
    .optional()
    .trim()
    .isLength({max: 100})
    .withMessage('SKU should not exceed 100 characters'),    
    body('stock')
    .optional()
    .isInt({min: 0})
    .withMessage('Stock must be a non-negative integer'),
    body('category')
    .optional()
    .trim()
    .isLength({max: 100})
    .withMessage('Category should not exceed 100 characters'),
    body('brand')
    .optional()
    .trim()
    .isLength({max:100})
    .withMessage('Brand should not exceed 100 characters'),
    body('status')
    .optional()
    .isIn(['active', 'inactive', 'draft'])
    .withMessage('Status must be active, inactive, or draft'),
    body('featured')
    .optional()
    .isBoolean()
    .withMessage('Featured must be a boolean')
]

export const validateUpdateProduct = [
    param('id')
    .isInt({min: 1})
    .withMessage('Product id must be a positive integer')
    .toInt(),
    body('name')
    .trim()
    .optional()
    .isLength({min:2, max:200})
    .withMessage('Product name should be between 2 and 200 characters'),
    body('slug')
    .trim()
    .optional()
    .isLength({min: 2, max:250})
    .withMessage('Slug should be between 2 and 250 characters'),
    body('description')
    .trim()
    .optional(),
    body('shortDescription')
    .trim()
    .optional()
    .isLength({max:500})
    .withMessage('Short description should not exceed 500 characters'),
    body('price')
    .optional()
    .isFloat({min: 0})
    .withMessage('Price must be a positive number'),
    body('comparePrice')
    .optional()
    .isFloat({min: 0})
    .withMessage('Compare price must be a positive number'),
    body('sku')
    .optional()
    .trim()
    .isLength({max: 100})
    .withMessage('SKU should not exceed 100 characters'),
    body('stock')
    .optional()
    .isInt({min: 0})
    .withMessage('Stock must be a non-negative integer'),
    body('category')
    .optional()
    .trim()
    .isLength({max: 100})
    .withMessage('Category should not exceed 100 characters'),
    body('brand')
    .optional()
    .trim()
    .isLength({max:100})
    .withMessage('Brand should not exceed 100 characters'),
    body('images')
    .optional()
    .isArray()
    .withMessage('Images must be an array'),
    body('status')
    .optional()
    .isIn(['active', 'inactive', 'draft'])
    .withMessage('Status must be active, inactive, or draft'),
    body('featured')
    .optional()
    .isBoolean()
    .withMessage('Featured must be a boolean')
]

export const validateProductQuery = [
    query('page')
    .optional()
    .isInt({min: 1})
    .withMessage('Page must be a positive integer'),
    query('limit')
    .optional()
    .isInt({min:1, max: 100})
    .withMessage('Limit must be between 1 and 100'),
    query('status')
    .optional()
    .isIn(['active', 'inactive', 'draft'])
    .withMessage('Status must be active, inactive, or draft')
]