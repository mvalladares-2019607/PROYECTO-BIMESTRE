import Producto from "../Producto/product.model.js";

export const productosGet = async (req, res) => {
    try {
        const { limite = 10, desde = 0 } = req.query;
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
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los productos' });
    }
};

export const getProductoById = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await Producto.findOne({ _id: id });

        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.status(200).json({ producto });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el producto' });
    }
};

export const productosDelete = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await Producto.findById(id);

        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        producto.estado = false;
        await producto.save();

        res.status(200).json({ message: 'Producto eliminado', producto });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto' });
    }
};

export const productosPut = async (req, res) => {
    try {
        const { nombre, stock } = req.body;
        const productoId = req.params.id;
        const producto = await Producto.findById(productoId);

        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        producto.nombre = nombre;
        producto.stock = stock;
        await producto.save();

        res.status(200).json({ message: 'Producto actualizado exitosamente', producto });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el producto' });
    }
};

export const productosPost = async (req, res) => {
    try {
        const { nombre, categoria, stock } = req.body;

        const producto = new Producto({ nombre, categoria, stock });
        await producto.save();

        res.status(201).json({ message: 'Producto creado exitosamente', producto });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el producto' });
    }
};


