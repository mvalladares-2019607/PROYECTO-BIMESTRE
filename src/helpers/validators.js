'use strict'

import {hash, compare} from 'bcrypt'


export const encrypt = (password)=>{
    try{
        return hash(password, 10)
    }catch(err){
        console.error(err)
        return err
    }
}
export const checkPassword = async(password, hash)=>{
    try {
        return await compare(password, hash)
    } catch (error) {
        console.error(error)
        return error
    }
}
export const verificarRol = (rolesPermitidos) => {
    return (req, res, next) => {
        const { user } = req;

        if (!user || !user.role || !rolesPermitidos.includes(user.role)) {
            return res.status(403).json({ message: 'Acceso no autorizado' });
        }
        next();
    };
}


