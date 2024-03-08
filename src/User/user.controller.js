import Usuario from '../User/user.model.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { encrypt } from '../helpers/validatros.js';

export const usuariosGet = async (req, res) => {
    try {
        const { limite, desde} = req.query;
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
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios' });
    }
};
export const usuariosPost = async (req, res) => {
    try {
        const { name, email, telefono, password, role } = req.body;
        const usuario = new Usuario({ name, email, telefono, password, role });
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, salt);
        await usuario.save();
        res.status(201).json({ message: 'Usuario creado exitosamente', usuario });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario' });
    }
};
export const usuariosPut = async (req, res) => {
    try {
        const { name, email, telefono, password, role } = req.body;
        const usuarioId = req.params.id;
        const usuario = await Usuario.findById(usuarioId);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        usuario.name = name;
        usuario.email = email;
        usuario.telefono = telefono;
        usuario.role = role;

        if (password) {
            const salt = bcryptjs.genSaltSync();
            usuario.password = bcryptjs.hashSync(password, salt);
        }
        await usuario.save();
        res.status(200).json({ message: 'Usuario actualizado correctamente', usuario });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
};
export const getUsuarioByid = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findOne({ _id: id });
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({ usuario });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el usuario' });
    }
};
export const usuariosDelete = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findByIdAndDelete(id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el usuario' });
    }
};
export const register = async (req, res) => {
    try {
        const { name, email, telefono, password, role } = req.body;
        const hashedPassword = await encrypt(password);
        const usuario = new Usuario({ name, email, telefono, password: hashedPassword, role });
        await usuario.save();
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar el usuario' });
    }
};
export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Usuario.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        const passwordValido = await bcryptjs.compare(password, user.password);
        if (!passwordValido) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }
        const token = jwt.sign({ id: user._id }, 'secreto');
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
};
