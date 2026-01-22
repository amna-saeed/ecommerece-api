import { DataTypes } from "sequelize";
import {sequelize} from "../config/database.js";
import bcrypt from "bcryptjs";

const User = sequelize.define("User", {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:{
            name: 'email',
            msg: 'Your email is already registered'
        },
        validate: {
            isEmail:{
                msg: 'Please provide a valid email address'
            },
            notEmpty:{
                msg: 'Email is required'
            },
            len:{
                args: [5, 100],
                msg: 'Email should be between 5 and 100 characters'
            }
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:{
                msg: 'Password is required'
            },
            len:{
                args:[5,50],
                msg: 'Password should be between 5 and 50 characters'
            }
        }
    },
    first_name :{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:{
                msg: 'First name is required'
            },
            len:{
                args:[2,50],
                msg: 'First name should be between 2 and 50 characters'
            }
        }
    },
    last_name:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{  
            notEmpty:{
                msg: 'Last name is required'
            },  
            len:{
                args:[2,50],
                msg: 'Last name should be between 2 and 50 characters'
            }
        }   
    },
    role:{
        type: DataTypes.ENUM('user', 'admin', 'customer'),
        defaultValue: 'customer',
        validate:{
            isIn :{
                args: [['user', 'admin', 'customer']],
                msg: 'Role must be either user, admin, or customer'
            }
        }
    },
    isActive:{
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: 'is_active'
    },
    emailVerified:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'email_verified'
    },
    lastLogin:{
        type: DataTypes.DATE,
        allowNull: true,
        field: 'last_login'
    }
},{
    tableName: 'users',
    timestamps: true,
    hooks:{
        beforeCreate: async(user)=> {
            if(user.password){
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        },
        beforeUpdate: async(user)=> {
            if(user.changed('password')){
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        }
    }
});

User.prototype.comparePassword = async function (candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password);
}

User.prototype.getFullName = function(){
    return `${this .first_name } ${this.last_name}`
}

export default User;