import express from 'express'

import { getProductoByid, productosDelete, productosGet, productosPost, productosPut } from './product.controller.js'
import { validarJWT } from '../helpers/jwt.js';
const api = express.Router(); 

api.post('/productPost', [validarJWT],  productosPost)
api.get ('/productGet', productosGet)
api.get('/getProductoByid/:id', getProductoByid)
api.put('/:id', [validarJWT], productosPut)
api.delete('/:id', [validarJWT], productosDelete)
export default api