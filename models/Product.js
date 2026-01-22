import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Product = sequelize.define("Product", {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Product name is required",
            },
            len:{
                args: [2, 200],
                msg: 'Product name should be between 2 and 200 characters'
            },
        },
    },
    slug: {
        type: DataTypes.STRING(250),
        allowNull: false,
        unique:{
            name: 'slug',
            msg: 'Product slug must be unique'
        },
    },
    description:{
        type: DataTypes.TEXT,
        allowNull: true
    },
    shortDescription: {
        type: DataTypes.STRING(500),
        allowNull: true,
        field: 'short_description'
    },
    price:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
        validate:{
            min:{
                args: [0],
                msg: 'Price must be greater than or equal to 0'
            }
        }
    },
    comparePrice: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,
        field: 'compare_price'
    },
    sku: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique:{
            name: 'sku',
            msg: 'SKU must be unique'
        },
    },
    stock:{
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate:{
            min: {
                args: [0],
                msg: 'Stock can not be negative'
            }
        },
    },
    category:{
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    brand: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    images: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: []
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive', 'draft'),
        defaultValue: 'active',
        validate:{
            isIn:{
                args: [['active', 'inactive', 'draft']],
                msg: 'Status must be active, inactive or draft'
            },
        },
    },
    featured:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    rating:{
        type: DataTypes.DECIMAL(3,2),
        defaultValue: 0,
        validate : {
            min:{
                args: [0],
                msg: 'Rating must be 0 to 5',
            },
            max:{
                args: [5],
                msg: 'Rating must be 0 to 5'
            },
        },
    },
    reviewCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        field: 'review_count'
    },
},{
    tableName : 'products',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    underscored: false,
    indexes:[
        {
            fields : ['slug']
        },
        {
            fields: ['category']
        },
        {
            fields: ['status']
        }
    ]
});

export default Product;