import express from 'express' 

import { userLogin, register, usuariosPost, usuariosGet, getUsuarioByid, usuariosPut, usuariosDelete} from './user.controller.js'

const api = express.Router(); 

api.post('/register', register)
api.post ('/login', userLogin)
api.post('/userPost', usuariosPost)
api.get('/userGet', usuariosGet)
api.get('/getUsuarioByid/:id', getUsuarioByid)
api.put('/:id', usuariosPut)
api.delete('/:id', usuariosDelete)
export default api 