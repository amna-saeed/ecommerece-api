import Product from "./Product.js";
import ProductDetail from "./ProductDetail.js";
import User from "./User.js";
import Cart from "./Cart.js";
import CartItem from "./CartItem.js";


// Product associations
Product.hasOne(ProductDetail, {foreignKey: 'productId', as: 'details', onDelete: 'CASCADE'});
ProductDetail.belongsTo(Product, {foreignKey: 'productId', as: 'product'})

// Cart associations
Cart.belongsTo(User, { foreignKey: 'userId', as: 'users' });
Cart.hasMany(CartItem, { foreignKey: 'cartId', as: 'items', onDelete: 'CASCADE' });
CartItem.belongsTo(Cart, { foreignKey: 'cartId', as: 'cart' });
CartItem.belongsTo(Product, { foreignKey: 'productId', as: 'products' });

