import User from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';
import asyncHandler from '../middleware/asyncHandler.js';

// @desc    Register a new user
export const register = asyncHandler(async(req, res)=> {
    const {email, password, first_name, last_name, role} = req.body;

    const existingUser = await User.findOne({where: {email}});
    if(existingUser){
        return res.status(400).json({success:false, message: 'User with this email already exists'});
    }

    const createUser = await User.create({
        email: email.trim().toLowerCase(),
        password,
        first_name: first_name.trim(),
        last_name: last_name.trim(),
        role: role || 'customer'
    });

    const token = generateToken(createUser.id);

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        data:{
            token,
            user:{
                id: createUser.id,
                email: createUser.email,
                first_name: createUser.first_name,
                last_name: createUser.last_name,
                role: createUser.role
            }
        }
    })
});


// @desc    Login user
export const login = asyncHandler(async(req, res)=> {
    const {email, password} = req.body;

    const user = await User.findOne({where: {email}})

    if(!user || !(await user.comparePassword(password))){
        return res.status(401).json({success:false, message: 'Invalid credentials'});
    }

    if(!user.isActive){
        return res.status(403).json({success:false, message: 'User account is deactivated'});
    }

    user.lastLogin = new Date();
    await user.save();

    const token  = generateToken(user.id);
    
    res.json({
        success: true,
        data:{
            user:{
                id: user.id,
                email: user.email,
                first_name:user.first_name,
                last_name:user.last_name,
                role: user.role
            },
            token
        }
    })  
});

// update user
export const updateUser = asyncHandler(async(req, res)=> {
    const {first_name, last_name} = req.body;

    const user = await User.findByPk(req.params.id)
    if(!user){
        return res.status(404).json({success: false, message: "User not found"})
    }

    if(req.user.id !== user.id && req.user.role !== 'admin'){
        return res.status(403).json({
            success: false,
            message: 'Not authorized to update this user'
        });
    }

    await user.update({
        first_name : first_name || user.first_name,
        last_name: last_name || user.last_name
    }),

    res.json({
        success: true,
        data: { user }
    });
});

// getUserId
export const getUserById = asyncHandler(async(req, res, next)=> {
    const user = await User.findByPk(user.params.id, {
        attributes: {exclude:['password']}
    })

    if(!user){
        return res.status(404).json({
            success: false,
            message: "User not found"
        })
    }

    if(req.user.id !== user.id && req.user.role !== 'admin'){
        return res.status(403).json({
            success: false,
            message: 'Not authorized to view this user'
        });
    }

    res.json({
        success: true,
        data: { user }
    });
});

// UpdatePassword
export const changePassword = asyncHandler(async(req, res)=> {
    const {currentPassword, newPassword} = req.body;
    const userId = req.params.id;

    const user = await User.findByPk(userId);

    if(!user){
        return res.status(404).json({
            success: false,
            message: "User not found"
        })
    }

    if(req.user.id !== user.id && req.user.role !== 'admin'){
        return res.status(403).json({
            success: false,
            message: 'Not authorized to change this user\'s password'
        });
    }

    if(req.user.id === user.id){
        const isPasswordValid = await user.comparePassword(currentPassword);
        if(!isPasswordValid){
            return res.status(401).json({
                success: false,
                message: 'Current password is incorrect'
            })
        }
    }

    const isSamePassword = await user.comparePassword(newPassword);
    if(isSamePassword){
        return res.status(400).json({
            success: false,
            message: 'New password must be different from current password'
        });
    }

    user.password = newPassword;
    await user.save();

    res.json({
        success: true,
        message: 'Password changed successfully'
    });
})