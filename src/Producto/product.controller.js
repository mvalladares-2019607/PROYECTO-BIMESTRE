import Producto from '../Producto/product.model.js';
// import Categoria from '../Categories/category.model.js';
import User from '../User/user.model.js';
export const productosGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.status(200).json({
        total,
        productos
    })
};
export const getProductoByid = async (req, res) => {
    const { id } = req.params;
    const productos = await Producto.findOne({ _id: id });

    res.status(200).json({
        productos
    });
};
export const getInventarioExhaustivo = async (req, res) => {

}
export const productosAgotadosGet = async (req, res = response) => {

};
export const productosPut = async (req, res) => {
    const { id } = req.params;
    const { nombre, categoria, stock } = req.body;
    if (!req.usuario) {
        return res.status(403).json({ message: 'NO EXISTE EL USUARIO' });
    }
    if (!req.usuario.role) {
        return res.status(403).json({ message: 'Acceso no autorizado' });
    }
    if (req.usuario.role !== 'ADMIN_ROLE') {
        return res.status(403).json({ message: 'Acceso no autorizado para editar productos' });
    }
    try {
        const producto = await Producto.findByIdAndUpdate(id, nombre, categoria, stock ); // Agregamos { new: true } para que devuelva el producto actualizado
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};


export const productosDelete = async (req, res) => {
    const { id } = req.params;
    if (!req.usuario) {
        return res.status(403).json({ message: 'NO EXISTE EL USUARIO' });
    }
    if (!req.usuario.role) {
        return res.status(403).json({ message: 'Acceso no autorizado' });
    }
    if (req.usuario.role !== 'ADMIN_ROLE') {
        return res.status(403).json({ message: 'Acceso no autorizado para eliminar productos' });
    }
    try{
        const deletedProducto = await Producto.findOneAndDelete({_id: id});
        if(!deletedProducto) return res.status(404).send({message: 'Producto no encontrado'});
        return res.send({message: `Producto eliminado`});
    }catch(error){
        console.error(error);
        return res.status(500).send({message: 'Failed deleted'});
    }
};
export const productosMasVendidos = async (req, res) => {

};

export const productosPost = async (req, res) => {
    const { nombre, categoria, stock, estado } = req.body;
    const producto = new Producto({ nombre, categoria, stock, estado });
    if(!req.usuario){
        return res.status(403).json({ message: 'NO EXISTE EL USUARIO' });
    }
    if (!req.usuario.role) {
        return res.status(403).json({ message: 'Acceso no autorizado' });
    }
    if (req.usuario.role !== 'ADMIN_ROLE') {
        return res.status(403).json({ message: 'Acceso no autorizado para agregar productos' });
    }
    await producto.save();
    res.status(200).json({
        producto
    });
}


