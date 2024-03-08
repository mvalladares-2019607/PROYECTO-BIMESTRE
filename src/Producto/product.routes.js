import express from 'express'

import { getProductoByid, productosGet, productosPost } from './product.controller.js'

const api = express.Router(); 

api.post('/productPost', productosPost)
api.get ('/productGet', productosGet)
api.get('/getProductoByid/:id', getProductoByid)
export default api