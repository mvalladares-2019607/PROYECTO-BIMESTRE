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
    await categoria.save(); 
    res.status(200).json({
        categoria
    })
}

export const categoriasPut = async (req, res) => {
    const { id } = req.params; 
    const { _id, nombre } = req.body;

    await Categoria.findByIdAndUpdate(id);
    const categoria = await Categoria.findOne({_id: id})

    res.status(200).json({
        msg: 'Se han actualizado correctamente los datos', 
        categoria
    })
};

export const categoriasDelete = async (req, res) => {
    const { id } = req.params; 
    await Categoria.findByIdAndUpdate(id, {estado: false});
    const categoria = await Categoria.findOne({_id: id});
    res.status(200).json({
        msg: 'Los datos se han eliminado', 
        categoria
    })
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