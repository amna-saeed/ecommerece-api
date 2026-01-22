import Cart from "../models/Cart.js";
import CartItem from "../models/CartItem.js";
import Product from "../models/Product.js";
import asyncHandler from "../middleware/asyncHandler.js";
import "../models/associations.js";

export const getCart = asyncHandler(async(req, res)=> {
    let cart = await Cart.findOne({
        where: {userId: req.user.id, status: 'active'},
        include:[{
            model: CartItem,
            as: 'items',
            include: [{
                model: Product,
                as: 'product',
                attributes: ['id', 'name', 'price', 'image', 'stock']
            }]
        }]
    });

    if(!cart){
        cart = await Cart.create({
            userId: req.user.id,
            status: 'active'
        })
    };

    let total = 0
    if(cart.items && cart.items.length > 0 ){
        total = cart.items.reduce((sum, item)=> sum + parseInt(item.subtotal), 0)
        await cart.update({total})
    }
    res.json({
        success: true,
        data: {cart}
    })
});


export const addToCart = asyncHandler(async(req, res)=> {
    const {productId, quantity = 1 } = req.body;

    let cart = await Cart.findOne({
        where:{userId: req.user.id, status: 'active'}
    })
    if(!cart){
        cart = await Cart.create({
            userId: req.user.id,
            status: 'active'
        })
    };

    const product = await Product.findByPk(productId);
    if(!product){
        return res.status(404).json({
            success: false,
            message: "Product not found"
        })
    };

    if(product.stock < quantity){
        return res.status(400).json({
            success: false,
            message: `Only ${product.stock} items available in stock`
        })
    };

    const existingItem = await CartItem.findOne({
        where: {cartId: cart.id, productId}
    });

    let cartItem;
    if(existingItem){
        const newQuantity = existingItem.quantity + quantity;
        if(product.stock < newQuantity){
            return res.status(400).json({
                success: false,
                message: `Only ${product.stock} items available in stock`
            });
        }
        const subtotal = parseFloat(product.price) * newQuantity;
        await existingItem.update({ quantity: newQuantity, subtotal });
        cartItem = existingItem;
    }else{
        const subtotal = parseFloat(product.price) * quantity;
        cartItem = await CartItem.create({
            cartId: cart.id,
            productId,
            quantity,
            price: product.price,
            subtotal
        });
    }

})