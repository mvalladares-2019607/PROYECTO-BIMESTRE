import Categoria from '../Categories/category.model.js'
import User from '../User/user.model.js'

export const categoriasGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        categorias
    });
};
export const categoriasPost = async (req, res) => {
    const { nombre } = req.body;
    const categoria = new Categoria ({ nombre}); 
    if(!req.usuario){
        return res.status(403).json({ message: 'NO EXISTE EL USUARIO' });
    }
    if (!req.usuario.role) {
        return res.status(403).json({ message: 'Acceso no autorizado' });
    }
    if (req.usuario.role !== 'ADMIN_ROLE') {
        return res.status(403).json({ message: 'Acceso no autorizado para agregar categorias' });
    }
    await categoria.save(); 
    res.status(200).json({
        categoria
    })
}

export const categoriasPut = async (req, res) => {
    const { id } = req.params; 
    const {  nombre } = req.body;
    if(!req.usuario){
        return res.status(403).json({ message: 'NO EXISTE EL USUARIO' });
    }
    if (!req.usuario.role) {
        return res.status(403).json({ message: 'Acceso no autorizado' });
    }
    if (req.usuario.role !== 'ADMIN_ROLE') {
        return res.status(403).json({ message: 'Acceso no autorizado para editar categorías' });
    }
    try{
        const categoria = await Categoria.findByIdAndUpdate(id, nombre);
        if(!categoria){
            return res.status(404).json({message: 'Categoría no encontrado'});
        }
        res.status(200).json({message: 'Categoría actualizada'});
    }catch(error){
        console.error("Error al actualizar la categoría:", error);
        res.status(500).json({message: 'Error interno en el servidor'});
    }
    

 
};

export const categoriasDelete = async (req, res) => {
    const { id } = req.params; 
    if(!req.usuario){
        return res.status(403).json({ message: 'NO EXISTE EL USUARIO' });
    }
    if (!req.usuario.role) {
        return res.status(403).json({ message: 'Acceso no autorizado' });
    }
    if (req.usuario.role !== 'ADMIN_ROLE') {
        return res.status(403).json({ message: 'Acceso no autorizado para eliminar categorías' });
    }
    try{
        const deletedCategoria = await Categoria.findOneAndDelete({_id: id});
        if(!deletedCategoria) return res.status(404).send({message: 'Categoria no encontrado'});
        return res.send({message: `Categoria eliminada`});
    }catch(error){
        console.error(error);
        return res.status(500).send({message: 'Failed deleted'});
    }
};
export const getCategoriaByid = async (req, res) => {
    try {
        const { id } = req.params;
        const categoria = await Categoria.findOne({ _id: id });
        if (!categoria) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        res.status(200).json({ categoria });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la categoría' });
    }
};