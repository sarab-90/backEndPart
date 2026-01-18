import React from "react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../../api.js";

function DisplayCategories (){
    const [categories, setCategories] = useState([]);

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
    // fetch categories
        useEffect(() => {
            fetchCategories();
        }, []);
    return(
        <>
        <h3>Categories</h3>
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
                                <button>Delete</button> 
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
        </>

    )
}
export default DisplayCategories;