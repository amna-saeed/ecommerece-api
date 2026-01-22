import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const proceed = async(req, res, next)=> {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token){
        return res.status(401).json({message: 'Not authorized, token missing'});
    }

    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findByPk(decode.id,{
            attributes: {exclude: ['password']}
        });

        if(!req.user){
            return  res.status(401).json({message: 'Not authorized, user not found'});
        }

        if(!req.user.isActive){
            return res.status(403).json({message: 'User account is deactivated'});
        }
        next();
    }catch(error){
        return res.status(401).json({message: 'Not authorized, token failed'});
    }
}

const authorize = (...roles)=> {
    return (req, res, next)=> {
        if(!roles.includes(req.user.role)){
            return res.status(403).json({message: 'User role not authorized to access this resource', role: req.user.role});
        }
        next();
    }
}

export {proceed, authorize};