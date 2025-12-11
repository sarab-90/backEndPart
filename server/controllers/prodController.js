import product from "../models/products.js";

export const addProduct = async (req, res) => {
    const {name, price, description} = req.body;

    try {
        const newProduct = await product.create({
            name, price, description
        })
        res.status(201).json({
            product: newProduct
        })
    } catch (error) {
        res.status(500).json({message: "Server Error"})
    }
}
export const getAllProducts = async (req, res) => {
    try {
        const products = await product.find({});
        res.status(200).json({products: products})       
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
export const deleteProduct = async (req, res) => {
    const {id} = req.params;
    try {
        const productToDelete = await product.findByIdAndDelete(id);
        if (!productToDelete) {
            return res.status(404).json({message: "Product not found"})
        }
        res.status(200).json({message: "Product deleted successfully"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const updateProduct = async (req, res) => {
    const {id} = req.params;
    const {name, price, description} = req.body;

    try {
        const productToUpdate = await product.findByIdAndUpdate(id, {name, price, description}, {new: true});
        if (!productToUpdate) {
            return res.status(404).json({message: "Product not found"})
        }
        res.status(200).json({product: productToUpdate})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}