import Producto from '../Producto/product.model.js'; 
// import Categoria from '../Categories/category.model.js';
import User from '../User/user.model.js';
export const productosGet = async (req, res  = response) => {
    const { limite, desde } = req.query; 
    const query = {estado: true}; 

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
    const { _id, nombre, categoria, stock} = req.body;

    await Producto.findByIdAndUpdate(id);
    const producto = await Producto.findOne({_id: id})

    res.status(200).json({
        msg: 'Se han actualizado correctamente los datos', 
        producto
    })
};
export const productosDelete = async (req, res) => {
   const {id } = req.params; 
   await Producto.findByIdAndUpdate(id, {estado: false}); 
   const producto = await Producto.findOne({_id: id});
   res.status(200).json({
    msg: 'Los datos se han eliminado correctamente',
    producto
   })
}; 
export const productosMasVendidos = async (req, res) =>{

};

export const productosPost = async (req, res) =>{
    const { nombre, categoria, stock, estado} = req.body;
    const producto = new Producto ({ nombre, categoria, stock, estado}); 
    await producto.save();
    res.status(200).json({
        producto
    });
}


