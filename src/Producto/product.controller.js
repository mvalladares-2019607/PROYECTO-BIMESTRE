import Producto from "../Producto/product.model.js"; 

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
}

