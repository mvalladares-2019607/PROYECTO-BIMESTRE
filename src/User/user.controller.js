import Usuario from '../User/user.model.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { encrypt } from '../helpers/validatros.js'

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
}
export const usuariosPost = async (req, res) => {
  const { name, email, telefono, password, role } = req.body;
  const usuario = new Usuario({ name, email, telefono, password, role });

  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  await usuario.save();
  res.status(200).json({
      usuario
  });
}
export const usuariosPut = async (req, res) => {
  try {
    const { name, password, email, telefono, role } = req.body;
    const usuarioId = req.params.id;
    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) {
      return res.status(404).json({ message: 'usuario no encontrado' });
    }
    usuario.name = name; 
    usuario.password = password;
    usuario.email = email; 
    usuario.telefono = telefono, 
    usuario.role = role;
    
    await usuario.save();
    res.status(200).json({ message: 'usuario actualizado correctamente', usuario });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el usuario', error: error.message });
  }
};

export const getUsuarioByid = async (req, res) => {
  const { id } = req.params;
  const usuario = await Usuario.findOne({ _id: id });

  res.status(200).json({
      usuario
  });
};

export const usuariosDelete = async (req, res) =>{
  const { id } = req.params;
  await Usuario.findByIdAndUpdate(id, {estado:false});

  const user = await Usuario.findOne({_id: id});
  res.status(201).json({message: 'Usuario eliminado exitosamente'}), 
  user
};

export const register = async (req, res) => {
    try{
        const data = req.body; 
        console.log(data); 
        data.password = await encrypt(data.password)
        const user = new Usuario(data)
        await user.save()
        return res.send({message: `Registered`});
    }catch(error){
        console.error(error)
        return res.status(500).send({message: 'Error register'})
    }
};

export const userLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Usuario.findOne({ email }); 
      if (!user) {
        return res.status(404).json({ mensaje: 'user not fined' });
      }
      const passwordValido = await bcryptjs.compare(password, user.password); 
      if (!passwordValido) {
        return res.status(401).json({ mensaje: 'password incorrect' }); 
      }
      const token = jwt.sign({ id: user._id }, 'secreto');
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };