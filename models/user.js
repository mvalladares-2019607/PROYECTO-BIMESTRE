const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        minLength: [8, 'Password must be 8 characters'],
        required: true
    },
    email: {
        type: String,
        required: [true, 'Se necesita correo']
    },
    telefono: {
        type: String,
        minLength: 8,
        maxLength: 8,
        required: [true, 'Se necesita teléfono']
    }, 

})

const User = mongoose.model('User', UserSchema);
module.exports = User;