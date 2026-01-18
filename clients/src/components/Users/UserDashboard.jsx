import React from "react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../api.js";

function UserDashboard(){
    const [products, setproducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);

    // fetch Users
    const fetchUsers = async () => {
        try {
            const response = await api.get('/allUsers');
            console.log("response users",response);
            // check if there is no users
            if (response.data.users.length === 0) {
                toast.error(response.data.message || "No users found");
                return;
            }
            setUsers(response.data.users);
        } catch (error) {
            toast.error("Failed to fetch users");
            console.log(error);
        }
    }

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

    // fetch Products
    const fetchProducts = async () => {
        try {
            const response = await api.get('/products');
            console.log(response);
            // check if there is no products
            if (response.data.products.length === 0) {
                toast.error(response.data.message || "No products found");
                return;
            }
            setproducts(response.data.products);
        } catch (error) {
            toast.error("Failed to fetch products")
        }
    };
    // fetch categories
    useEffect(() => {
        fetchCategories();
    }, []);

    // fetch products
    useEffect(() => {
        fetchProducts();
    }, []);

    // fetch users
    useEffect(() => {
        fetchUsers();
    }, []);

    return(
        <>
        <div>User Dashboard</div>
        <h3>Users</h3>
        {users.map((user) => (
            <div 
            key={user._id} 
            className="card" 
            style={{width: "18rem"}}
            >
                <div className="card-body">
                    <h5 className="card-title">{user.name}</h5>
                    <p className="card-text">{user.email}</p>
                </div>
            </div>
        ))}

        <h3>Products</h3>
        {products.map((product) => (
            <div className="card" style={{width: "18rem"}}>
                    <img 
                    className="card-img-top" 
                    src={product.thumbnail} 
                    alt={product.name}
                    />
                    <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">{product.description}</p>
                        <h6 className="card-subtitle mb-2 text-muted">${product.price}</h6>
                        <p className="card-text">Stock: {product.stock}</p>
                        <button className="btn btn-primary">Buy Now</button>
                    </div>
            </div>
        ))}

        <h3>Categories</h3>
        {categories.map((category) => (
            <div 
            key={category._id} 
            className="card" 
            style={{width: "18rem"}}
            >
                <div className="card-body">
                    <h5 className="card-title">{category.name}</h5>
                    <p className="card-text">{category.description}</p>
                </div>
            </div>
        ))}
        </>
    );
}
export default  UserDashboard;


{/* display user information */}
{/* display products as cards >> done*/}
{/* display categories as card */}