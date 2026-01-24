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
    const [editId, setEditId] = useState(null);
    const [editProduct, setEditProduct] = useState({})
    const [searchItem, setSearchItem] = useState("");

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
        // save edited product
        const handleSaveEdit = async (productId) => {
            try {
                const res = await api.put(`/admin/products/${productId}`, editProduct);
                if (res.status === 200) {
                    setproducts((prev) =>
                        prev.map((product) =>
                            product._id === productId ? { ...product, ...editProduct } : product
                    ));
                    toast.success(res.data.message || "Product updated successfully");
                    setEditId(null);
                    fetchProducts();
                }
            } catch (error) {
                toast.error("Failed to save product");
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
        <br/>
        <input
        type="text"
        placeholder="Search Product"
        value={searchItem}
        onChange={(e) => setSearchItem(e.target.value)}
        />
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
                {products.filter(
                    (product) => {
                        return(
                        product.name
                            .toLowerCase()
                            .includes(searchItem.toLowerCase() ||
                            product.category
                            .toLowerCase()
                            .includes(searchItem)
                        ));})
                .map((product, index) => {
                    const isEditing = editId === product._id;
                    return (
                        <tr key={product._id}>
                            <td>{index + 1}</td>
                            <td>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editProduct.name}
                                        onChange={(e) => 
                                            setEditProduct({...editProduct, name: e.target.value})}
                                    />
                                ):(
                                    product.name
                                )}
                            </td>
                            <td>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editProduct.price}
                                        onChange={(e) => 
                                            setEditProduct({...editProduct, price: e.target.value})}
                                    />
                                ):(
                                    product.price
                                )}
                            </td>
                            <td>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editProduct.stock}
                                        onChange={(e) => 
                                            setEditProduct({...editProduct, stock: e.target.value})}
                                    />
                                ):(
                                    product.stock
                                )}
                            </td>
                            <td>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editProduct.description}
                                        onChange={(e) => 
                                            setEditProduct({...editProduct, description: e.target.value})}
                                    />
                                ):(
                                    product.description || "No Description"
                                )}
                            </td>
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
                                {isEditing ? (
                                    <>
                                    <button onClick={() => handleSaveEdit(product._id)}>
                                        Save
                                        </button>   
                                    <button onClick={() => setEditId(null)}>
                                        Cancel
                                        </button>
                                    </> 
                                ):(
                                    <button onClick={() => {
                                        setEditId(product._id);
                                        setEditProduct({
                                            name: product.name,
                                            price: product.price,
                                            stock: product.stock,
                                            description: product.description,
                                        });
                                    }}>
                                        Edit
                                    </button>
                                )}
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