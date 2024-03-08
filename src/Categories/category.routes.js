import express from 'express'

import { categoriasDelete, categoriasGet, categoriasPost, categoriasPut, getCategoriaByid } from './category.controller.js'

const api = express.Router(); 

api.post('/categoryPost', categoriasPost)
api.get('/categoryGet', categoriasGet)
api.get('/getCategoriaByid/:id', getCategoriaByid)
api.put('/:id', categoriasPut)
api.delete('/:id', categoriasDelete)

export default api