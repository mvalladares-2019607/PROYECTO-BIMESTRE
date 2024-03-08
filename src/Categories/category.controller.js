import Categoria from '../Categories/category.model.js'

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
    const { name } = req.body; 
    const categoria = new Categoria({ name }); 

    await categoria.save(); 
    res.status(200).json({
        categoria
    })
};

export const categoriasPut = async (req, res) => {
    try{
        const { name } = req.body; 
        const categoriaId = req.params.id; 
        const categoria = await Categoria.findById(categoriaId);
        if( !categoria ) {
            return res.status(404).json({ message: 'categoría no encontrada'});
        }
        categoria.name = name; 
        await categoria.save(); 
        res.status(200).json({ message: 'categoria actualizada existosamente'});
    }catch(error){
        res.status(500).json({ message: 'Error al actualizar la categoría'});
    }
};

export const categoriasDelete = async (req, res) => {
    const { id } = req.params; 
    await Categoria.findByIdAndUpdate(id, {estado:false});
    const categoria = await Categoria.findOne({_id: id});
    res.status(201).json({menssage: 'Categoria eliminada con éxito'}), 
    categoria
}
export const getCategoriaByid = async (req, res) => {
    const { id } = req.params;
    const categorias = await Categoria.findOne({ _id: id });

    res.status(200).json({
        categorias
    });
};