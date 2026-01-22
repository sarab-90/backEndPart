import React from "react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../../api.js";
import Header from "../../Layout/Header.jsx";

function DisplayProduct (){
    const [products, setproducts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        stock: "",
        description: "",
        thumbnail: "",
        category: "",
    });

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
        // add new product
        const handleAddProduct = async (e) => {
            e.preventDefault();
            try {
                const res = await api.post('/admin/products', newProduct);

                if (res.status !== 201) {
                    toast.error(res.data.message);
                    return;
                }
                setproducts((prev) => [...prev, newProduct]);
                toast.success("Product added successfully");
                setShowForm(false);
                fetchProducts();
            } catch (error) {
                toast.error("Failed to add product");
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
        <button onClick={() => setShowForm(!showForm)}>Add New</button>
        {showForm && (
            <form onSubmit={handleAddProduct}>
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Product Name"
                    onChange={(e) =>
                        setNewProduct({ ...newProduct, name: e.target.value })}
                    required
                />
                <input
                    type="number"
                    name="price"
                    id="price"
                    placeholder="Price"
                    onChange={(e) =>
                        setNewProduct({ ...newProduct, price: e.target.value })}
                    required
                />
                <input
                    type="number"
                    name="stock"
                    id="stock"
                    placeholder="Stock"
                    onChange={(e) =>
                        setNewProduct({...newProduct, stock: e.target.value})}
                    required
                />
                <input
                    type="text"
                    name="description"
                    id="description"    
                    placeholder="Description"
                    onChange={(e) =>
                        setNewProduct({ ...newProduct, description: e.target.value })}
                    required
                />
                <input
                    type="text"
                    name="thumbnail"
                    id="thumbnail"
                    placeholder="Thumbnail URL"
                    onChange={(e) =>
                        setNewProduct({ ...newProduct, thumbnail: e.target.value })}
                    required
                />
                <input
                    type="text"
                    name="category"
                    id="category"
                    placeholder="Category"
                    onChange={(e) =>
                        setNewProduct({ ...newProduct, category: e.target.value })}
                    required
                />
                <button type="submit">Add</button>
                </form>
        )}
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