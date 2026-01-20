import React from "react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../../api.js";
import Header from "../../Layout/Header.jsx";

function DisplayProduct (){
    const [products, setproducts] = useState([]);

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
        // delete product
        const handleDelete = async (productId) => {
            try {
                const res = await api.delete(`/admin/products/${productId}`);
                if (res.status === 200) {
                    setproducts((prev) => prev.filter((product) => product._id !== productId));
                    toast.success(res.data.message);
                }
            } catch (error) {
                toast.error("Failed to delete product");
                console.log(error);
            }
        }       
        // fetch products
        useEffect(() => {
            fetchProducts();
        }, []); 
    return(
        <>
        <Header/>
        <h3>Products</h3>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Stocks</th>
                    <th>Description</th>
                    <th>Thumbnail</th>
                    <th>Category</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product, index) => {
                    return (
                        <tr key={product._id}>
                            <td>{index + 1}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.stock}</td>
                            <td>{product.description}</td>
                            <td>
                                <img
                                    src={product.thumbnail}
                                    alt={product.name}
                                    width="50"
                                    height="50"
                                />
                                </td>
                            <td>{product.category}</td>
                            <td>
                                <button>Edit</button>
                                <button onClick={() => handleDelete(product._id)}>Delete</button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
        </>
    )
}
export default DisplayProduct;