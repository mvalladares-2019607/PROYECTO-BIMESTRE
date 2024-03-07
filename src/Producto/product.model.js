import mongoose from 'mongoose'; 

const productSchema = mongoose.Schema ({
    nombre: {
        type: String, 
        required:   [true, 'el nombre es obligatorio']
    },
    categoria: {
        type: String, 
        required: [true, 'la categoria es obligatoria']
    }, 
    stock: {
        type: Number 
    }, 
    estado: {
        type: Boolean, 
        default: true
    }
}); 

export default mongoose.model ('product', productSchema)