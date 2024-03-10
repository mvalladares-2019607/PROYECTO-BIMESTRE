import express from 'express' 

import { userLogin,  usuariosGet, getUsuarioByid, usuariosPut, usuariosDelete, registrarCliente, registrarAdmin} from './user.controller.js'

const api = express.Router(); 

api.post ('/login', userLogin)

api.post('/registerClient', registrarCliente)
api.post('/registerAdmin', registrarAdmin)
api.get('/userGet', usuariosGet)
api.get('/getUsuarioByid/:id', getUsuarioByid)
api.put('/:id',  usuariosPut)
api.delete('/:id', usuariosDelete)
export default api 