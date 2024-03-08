import { Schema, model } from "mongoose";

const categoriaSchema = Schema ({
    name: {
        type: String,
        required: [true, 'Nombre obligatorio']
    },
    estado:{
        type: Boolean,
        default: true
    }
});

export default model('categoria', categoriaSchema);