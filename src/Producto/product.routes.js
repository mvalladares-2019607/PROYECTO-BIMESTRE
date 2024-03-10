import express from 'express'

import { getProductoByid, productosDelete, productosGet, productosPost, productosPut } from './product.controller.js'

const api = express.Router(); 

api.post('/productPost', productosPost)
api.get ('/productGet', productosGet)
api.get('/getProductoByid/:id', getProductoByid)
api.put('/:id', productosPut)
api.delete('/:id', productosDelete)
export default api