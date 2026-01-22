import { DataTypes } from "sequelize";
import {sequelize} from "../config/database.js"

export const ProductDetail = sequelize.define("ProductDetail",{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    productId : {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'product_id',
        references:{
            models: 'products',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    specifications:{
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: {}
    },
    additionalInfo:{
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'additional_info'
    },

    size:{
        type: DataTypes.STRING(50),
        allowNull: true
    },
    color:{
        type: DataTypes.STRING(50),
        allowNull: true
    },
    weight:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    dimensions:{
        type: DataTypes.STRING(100),
        allowNull: true
    },
    warranty:{
        type: DataTypes.STRING(200),
        allowNull:true
    },
    returnPolicy:{
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'return_policy'
    },
}, {
    tableName: 'product_details',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true
})

export default ProductDetail;