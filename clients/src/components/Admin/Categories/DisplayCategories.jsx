import React from "react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../../api.js";
import Header from "../../Layout/Header.jsx";

function DisplayCategories (){
    const [categories, setCategories] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newCategory, setNewCategory] = useState({
        name: "",
        description: "",
    });

    // fetch Categories
    const fetchCategories = async () => {
        try {
            const response = await api.get('/getAllCategories');
            console.log("response categories",response);
            // check if there is no categories
            if (response.data.category.length === 0) {
                toast.error(response.data.message || "No categories found");
                return;
            }
            setCategories(response.data.category);
        } catch (error) {
            toast.error("Failed to fetch categories");
            console.log(error);
        }
    };
    // delete category
    const handleDelete = async (categoryId) => {
        try {
            const res = await api.delete(`/deleteCategory/${categoryId}`);
            if (res.status === 200) {
                setCategories((prev) => prev.filter((category) => category._id !== categoryId));
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error("Failed to delete category");
            console.log(error);
        }
    }
    // add new category
    const handleAddCategory = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/addCategory', newCategory);

            if (res.status !== 201) {
                toast.error(res.data.message);
                return;
            }
            setCategories((prev) => [...prev, newCategory]);
            toast.success("Category added successfully");
            setShowForm(false);
            fetchCategories();
        } catch (error) {
            toast.error("Failed to add category");
            console.log(error);
        }
    }

    // fetch categories
        useEffect(() => {
            fetchCategories();
        }, []);
    return(
        <>
        <Header/>
        <h3>Categories</h3>
        <button onClick={() => setShowForm(!showForm)}>Add New </button>
        {showForm && (
            <form onSubmit={handleAddCategory}>
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Category Name"
                    onChange={(e) =>
                        setNewCategory({ ...newCategory, name: e.target.value })}
                    required
                />
                <input
                    type="text"
                    name="description"
                    id="description"
                    placeholder="Category Description"
                    onChange={(e) =>
                        setNewCategory({ ...newCategory, description: e.target.value })}
                    required
                />  
                <button type="submit">Add</button>
                </form>
        )}
            <div>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>    
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {categories.map((category, index) => {
                    return (
                        <tr key={category._id}>
                            <td>{index + 1}</td>
                            <td>{category.name}</td>
                            <td>{category.description}</td> 
                            <td>
                                <button>Edit</button>
                                <button onClick={() => handleDelete(category._id)}>Delete</button> 
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
        </div>
        </>
    )
}
export default DisplayCategories;