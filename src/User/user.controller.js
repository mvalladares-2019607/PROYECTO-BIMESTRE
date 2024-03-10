import Usuario from '../User/user.model.js';
import jwt from 'jsonwebtoken';
import  { encrypt } from '../helpers/validators.js'
import { verificarRol } from '../helpers/validators.js'
export const usuariosGet = async (req, res = response) => {
    
    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.status(200).json({
        total,
        usuarios
    });
};
export const registrarCliente = async (req, res) => {
    try {
        const data = req.body;
        const nuevoUsuario = new Usuario(data);
        const erroresValidacion = nuevoUsuario.validateSync();
        if (erroresValidacion) {
            const mensajesError = Object.values(erroresValidacion.errors).map(error => error.message);
            return res.status(400).json({ message: 'Error de validación al registrar cliente', errors: mensajesError });
        }
        const existingUser = await Usuario.findOne({ email: data.email });
        if (existingUser) {
            return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
        }
        const user = new Usuario(data);
        await user.save();
        return res.status(201).json({ message: `Registro exitoso, puede iniciar sesión con el correo ${user.email}` });
    } catch (error) {
        console.error('Error al registrar cliente:', error);
        return res.status(500).json({ message: 'Error al registrar cliente', error: error.message });
    }
};
export const registrarAdmin = async (req, res) => {
    try {
        const data = req.body;
        const nuevoUsuario = new Usuario(data);
        const erroresValidacion = nuevoUsuario.validateSync();
        if (erroresValidacion) {
            const mensajesError = Object.values(erroresValidacion.errors).map(error => error.message);
            return res.status(400).json({ message: 'Error de validación al registrar administrador', errors: mensajesError });
        }
        const existingUser = await Usuario.findOne({ email: data.email });
        if (existingUser) {
            return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
        }
        data.role = 'ADMIN_ROLE';
        const user = new Usuario(data);
        await user.save();
        return res.status(201).json({ message: `Administrador registrado exitosamente, puede iniciar sesión con el correo ${user.email}` });
    } catch (error) {
        console.error('Error al registrar administrador:', error);
        return res.status(500).json({ message: 'Error al registrar administrador', error: error.message });
    }
};
export const getUsuarioByid = async (req, res) => {
    const { id } = req.params;
    const usuario = await Usuario.findOne({ _id: id });

    res.status(200).json({
        usuario
    });
};
export const usuariosPut = async (req, res) => {
    const { id } = req.params;
    const { password, email, ...resto } = req.body;
    if (!req.user || !req.user.role) {
        return res.status(403).json({ message: 'Acceso no autorizado' });
    }
    if (req.user.role !== 'ADMIN_ROLE') {
        return res.status(403).json({ message: 'Acceso no autorizado para editar usuarios' });
    }
    try {
        const usuario = await Usuario.findByIdAndUpdate(id, resto);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const usuariosDelete = async (req, res) =>{
    try {
        const { id } = req.params;
        const usuario = await User.findById(id);

        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario no existe'
            });
        }
        const usuarioAutenticado = req.usuario;
        if (usuarioAutenticado.role !== 'ADMIN_ROLE') {
            return res.status(403).json({
                msg: 'Solo los administradores pueden eliminar perfiles'
            });
        }
        usuario.estado = false;
        await usuario.save();

        res.status(200).json({
            msg: 'Se elimino el perfil',
            usuario
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al eliminar el usuario',
        });
    }

};

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Usuario.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        const passwordValido = await encrypt(password, user.password);
        if (!passwordValido) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }
        const token = jwt.sign({ id: user._id }, 'secreto');
        res.json({ token });
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        res.status(500).json({ message: 'Error en el inicio de sesión', error: error.message });
    }
};