import jwt from 'jsonwebtoken'
const secretKey = 'H014M4730'

export const verificarToken = (req, res, next) => {
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).json({mensaje: 'No se ha proporcionado un token válido'});
    }
    jwt.verify(token, 'secreto', (error, decoded)=> {
        if(error){
            return res.status (401).json({mensaje: 'Token inválido'});
        }
        req.userId = decoded.id;
        next();
    });
};