import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const CartItem = sequelize.define("CartItem", {
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    cartId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        field: 'cart_id',
        references:{
            model: 'carts',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    productId:{
        type:DataTypes.INTEGER,
        allowNull: false,
        field: 'product_id',
        references:{
            model:'products',
            key:'id'
        },
        onDelete: 'CASCADE'
    },
    quantity:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate:{
            min:{
                args: [1],
                msg: 'Quantity must be at least 1'
            },
        },
    },
    price:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
        validate:{
            min:{
                args: [0],
                msg: 'Price must be greater than or equal to 0'
            },
        },
    },
    subTotal:{
        type:DataTypes.DECIMAL(10,2),
        allowNull: false,
        defaultValue: 0.00
    },
},{
    tableName: "cart_items",
    timestamps: true
})

export default CartItem;