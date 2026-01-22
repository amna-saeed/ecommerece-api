import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Cart = sequelize.define("Cart",{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id',
        references:{
            model: 'users',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    sessionId: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: 'session_id'
    },
    total:{
        type: DataTypes.DECIMAL(10,2),
        defaultValue: 0.00
    },

    status:{
        type: DataTypes.ENUM('active', 'draft', 'completed'),
        defaultValue:'active',
        validate:{
            isIn:{
                args: [['active', 'draft', 'completed']],
                msg:'Status must be active, draft, or completed'
            },
        },
    },
},{
    tableName: 'carts',
    timestamps: true
});
export default Cart;