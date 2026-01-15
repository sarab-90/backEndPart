import Category  from "../models/categories.Model.js";

export const addCategory  = async (req , res) => {
    const {name , description} = req.body;

    try {
        if (!name || description === undefined){
            return res.status(400).json({message: "Name , Description are required"})
        }
        const category = await Category.create({
            name, description
        });
        return res.status(201).json({
            Category: category, message: "Category created successfully"
        })
    } catch (error) {
        res.status(500).json({message: "Server Error",error})
    }
}
// get all Category
export const getAllCategories = async (req, res) => {
    try {
        const category = await Category.find();
        if (category.length === 0){
            return res.status(200).json({category: [], message: "No categories found"})
        }
        return res.status(200).json({category, message:"Category fetched successfully"})
    } catch (error) {
        res.status(500).json({message: "Error fetched Categories", error})        

    }
}

// get by ID 
export const getCategoryById = async (req, res) => {
    const {id} = req.params;
    try {
        const categoryById = await Category.findById(id);
        if (!categoryById){
            return res.status(404).json({message: "Category not found"})
        }
        return res.status(200).json({categoryById, message:"Category fetched successfully"})
    } catch (error) {
        res.status(500).json({message: "Error fetched Categories", error})        
    }

}
// update Category
export const updateCategory = async (req, res) => {
    const {id} = req.params;
    const {name, description} = req.body;

    try {
        const categoryToUpdate = await Category.findByIdAndUpdate(id, {name, description}, {new:true});
        if (!categoryToUpdate){
            return res.status(404).json({message:"Category not found"})
        }
        return res.status(200).json({categoryToUpdate, message: "Category updated successfully"})
    } catch (error) {
        res.status(500).json({message: "Error Update Categories" , error})        
    }
}
// delete Category
export const deleteCategory = async (req, res) => {
    const {id} = req.params;
    try {
        const categoryToDelete = await Category.findByIdAndDelete(id);
        if (!categoryToDelete){
            return res.status(404).json({message: "Category not Found"})
        }
        return res.status(200).json({message: "Category deleted successfully"})
        
    } catch (error) {
        res.status(500).json({message: "Error deleting Categories" , error})
    }
}