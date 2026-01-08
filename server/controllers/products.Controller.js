import Product from "../models/products.Models.js";

//create a product
export const addProduct = async (req, res) => {
    const {name, price, description, thumbnail , stock} = req.body;

    try {
        if (!name || !price || !thumbnail || stock === undefined) {
            return res.status(400).json({message:"Name, price, thumbnail and stock are required"})
        }
        const numberPrice = Number(price);
        const newProduct = await Product.create({
            name, numberPrice , description, thumbnail , stock
        });
        return res.status(201).json({
            product: newProduct, message: "Product created successfully"
        })
    } catch (error) {
        res.status(500).json({message: "Server Error",error})
    }
}
//get all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        if (products.length === 0){
            return res.status(200).json({ products: [] ,message: "No Products found"})
        }
        return res.status(200).json({products , message: "Product fetched successfully"})       
    } catch (error) {
        res.status(500).json({message:"Error fetched Product", error})
    }
}
// get by id 
export const getProductById = async (req, res) => {
    const {id} = req.params;
    try {
        const productById = await Product.findById(id);
        if (!productById) {
            return res.status(404).json({message: "Product not found"})
        }
        return res.status(200).json({productById , message: "Product fetched successfully"})
    } catch (error) {
        res.status(500).json({message:"Error fetched Product", error})
        
    }
}
// delete by id
export const deleteProduct = async (req, res) => {
    const {id} = req.params;
    try {
        const productToDelete = await Product.findByIdAndDelete(id);
        if (!productToDelete) {
            return res.status(404).json({message: "Product not found"})
        }
        return res.status(200).json({message: "Product deleted successfully"})
    } catch (error) {
        res.status(500).json({message: "Error deleting product" ,error})
    }
}

// update product
export const updateProduct = async (req, res) => {
    const {id} = req.params;
    const {name, price, description} = req.body;

    try {
        const productToUpdate = await Product.findByIdAndUpdate(id, {name, price, description}, {new: true});
        if (!productToUpdate) {
            return res.status(404).json({message: "Product not found"})
        }
        return res.status(200).json({productToUpdate, message: "Product updated successfully"})
    } catch (error) {
        res.status(500).json({message: "Error Update product" ,error})
    }
}