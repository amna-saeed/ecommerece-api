import Product from '../models/Product.js';
import { Op } from 'sequelize';
import asyncHandler from '../middleware/asyncHandler.js';
import '../models/associations.js';
import ProductDetail from '../models/ProductDetail.js';

// getProducts
export const getProducts = asyncHandler(async(req, res)=>{
    const { page=1, limit=10, category, status, featured, search, sort = 'createdAt', order = 'DESC'} = req.query;

    const offset = (page -1) * limit;
    const where = {};

    if(category) where.category = category;
    if(status) where.status = status;
    if(featured !== undefined) where.featured = featured === 'true';
    if(search){
        where[Op.or] =[
            {name: {[Op.like]: `%${search}%`}},
            { description: { [Op.like]: `%${search}%` } }
        ];
    }

    const {count, rows: products} = await Product.findAndCountAll({
        where,
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [[sort, order]],
        include: [
            {
                model: ProductDetail,
                as: 'details',
                required: false
            }
        ]
    });

    res.json({
        success: true,
        data:{
            products,
            pagination:{
                page: parseInt(page),
                limit: parseInt(limit),
                total: count,
                pages: Math.ceil(count / limit)
            }
        }
    })
})

// get productById
export const getProductById = asyncHandler(async(req, res)=>{
    const product = await Product.findByPk(req.params.id, {
        include: [{
            model: ProductDetail,
            as: 'details',
            required: false
        }]
    });

    if(!product){
        return res.status(404).json({
            success: false,
            message: "Product not found"
        })
    };

    res.json({
        success: true,
        data: {product} 
    });
});

// create product
export const createProduct = asyncHandler(async(req, res)=> {
    const productData = req.body;

    // Generate slug if not provided
    if(!productData.slug && productData.name){
        let baseSlug = productData.name.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
        
        // Check if slug exists and append number if needed
        let slug = baseSlug;
        let counter = 1;
        while (await Product.findOne({ where: { slug } })) {
            slug = `${baseSlug}-${counter}`;
            counter++;
        }
        productData.slug = slug;
    } else if (productData.slug) {
        // Check if provided slug already exists
        const existingProduct = await Product.findOne({ where: { slug: productData.slug } });
        if (existingProduct) {
            return res.status(400).json({
                success: false,
                message: `A product with the slug '${productData.slug}' already exists. Please use a different slug.`
            });
        }
    }

    // Check if SKU already exists
    if (productData.sku) {
        const existingProduct = await Product.findOne({ where: { sku: productData.sku } });
        if (existingProduct) {
            return res.status(400).json({
                success: false,
                message: `A product with the SKU '${productData.sku}' already exists. Please use a different SKU.`
            });
        }
    }

    const product = await Product.create(productData);

    if(req.body.details){
        await ProductDetail.create({
            productId: product.id,
            ...req.body.details
        });
    }

    const productWithDetails = await Product.findByPk(product.id, {
        include:[{
            model: ProductDetail,
            as: 'details',
            required: false
        }]
    });

    res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: {product: productWithDetails}
    })
});

// update Product
export const updateProduct = asyncHandler(async(req, res)=> {
    const product = await Product.findByPk(req.params.id);

    if(!product){
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }

    // Check for duplicate slug if slug is being updated
    if (req.body.slug && req.body.slug !== product.slug) {
        const existingProduct = await Product.findOne({ where: { slug: req.body.slug } });
        if (existingProduct) {
            return res.status(400).json({
                success: false,
                message: `A product with the slug '${req.body.slug}' already exists. Please use a different slug.`
            });
        }
    }

    // Check for duplicate SKU if SKU is being updated
    if (req.body.sku && req.body.sku !== product.sku) {
        const existingProduct = await Product.findOne({ where: { sku: req.body.sku } });
        if (existingProduct) {
            return res.status(400).json({
                success: false,
                message: `A product with the SKU '${req.body.sku}' already exists. Please use a different SKU.`
            });
        }
    }

    await product.update(req.body);

    if(req.body.details){
        const [details] = await ProductDetail.findOrCreate({
            where: {productId: product.id},
            defaults: {productId: product.id}
        });
        await details.update(req.body.details);
    }

    const updateProduct = await Product.findByPk(product.id,{
        include: [{
            model: ProductDetail,
            as: 'details',
            required: false
        }]
    });

    res.json({
        success: true,
        message: "Product updated successfully",
        data: {product: updateProduct}
    })
})

// delete product
export const deleteProduct = asyncHandler(async(req, res)=> {
    const product = await Product.findByPk(req.params.id)

    if(!product){
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }

    await product.destroy()

    res.json({
        success: true,
        message: "Product deleted successfully"
    })
})