import express from 'express'

import { categoriasDelete, categoriasGet, categoriasPost, categoriasPut, getCategoriaByid } from './category.controller.js'
import { validarJWT } from '../helpers/jwt.js';
const api = express.Router(); 

api.post('/categoryPost', [validarJWT], categoriasPost)
api.get('/categoryGet', categoriasGet)
api.get('/getCategoriaByid/:id', getCategoriaByid)
api.put('/:id', [validarJWT], categoriasPut)
api.delete('/:id', [validarJWT], categoriasDelete)

export default api