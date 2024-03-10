import express from 'express' 

import { userLogin,  usuariosGet, getUsuarioByid, usuariosPut, usuariosDelete, registrarCliente /*registrarAdmin*/} from './user.controller.js'
import { validarJWT } from '../helpers/jwt.js';

const api = express.Router(); 

api.post ('/login', userLogin)

api.post('/registerClient', registrarCliente)
// api.post('/registerAdmin', registrarAdmin)
api.get('/userGet', usuariosGet)
api.get('/getUsuarioByid/:id', getUsuarioByid)
api.put('/:id', [validarJWT], usuariosPut)
api.delete('/:id', [validarJWT], usuariosDelete)
export default api 