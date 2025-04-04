import { useState, useEffect } from "react";
import { db } from "./firebase";
import Header from "./Header";
import "./AdminDashboard.css"; // Import the CSS file

// import { db, storage } from "./firebase";
import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    updateDoc
} from "firebase/firestore";

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [editing, setEditing] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const querySnapshot = await getDocs(collection(db, "products"));
        const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(products);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (editing) {
                await updateDoc(doc(db, "products", editing.id), {
                    name,
                    price: Number(price),
                    description,
                    category
                });
                setEditing(null); // Reset editing state
            } else {
                await addDoc(collection(db, "products"), {
                    name,
                    price: Number(price),
                    description,
                    category,
                    createdAt: new Date()
                });
            }
    
            fetchProducts(); // Refresh the product list
            resetFormFields(); // Reset form fields
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };
    
    // helper function to reset form fields
    const resetFormFields = () => {
        setName("");
        setPrice(0);
        setDescription("");
        setCategory("");
    };
    
    const handleEdit = (product) => {
        setEditing(product);
        setName(product.name);
        setPrice(product.price);
        setDescription(product.description);
        setCategory(product.category);
    };

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            console.log("Deleting product with ID:", id);
            await deleteDoc(doc(db, "products", id));
            console.log("Product deleted successfully");
            fetchProducts(); // Refresh the product list
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Failed to delete product. Please check the console for details.");
        } finally {
            setLoading(false);
        }
    };

    const LoadingScreen = () => {
        return (
            <div className="loading-screen">
                <div className="spinner"></div>
            </div>
        );
    };

    return (
        <>
            <Header />

            {loading && <LoadingScreen />}
            
            <div className="admin-dashboard">
                <h2>Product Management</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Product Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Enter Price"
                        value={price === 0 ? "" : price}
                        onChange={(e) => {
                            const newValue = e.target.value;
                            setPrice(newValue === "" ? 0 : Number(newValue)); // Convert empty string back to 0
                        }}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="FruitCake">Fruit Cakes</option>
                        <option value="ChocolateCake">Chocolate Cakes</option>
                        <option value="SpecialtyCake">Specialty Cakes</option>
                        <option value="CupCake">Cup Cakes</option>
                        <option value="Vegan">Vegan & Sugar-Free</option>
                    </select>
                    <button type="submit">{editing ? "Update" : "Add"} Product</button>
                </form>

                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>${product.price}</td>
                                <td>{product.description}</td>
                                <td>{product.category}</td>
                                <td>
                                    <button onClick={() => handleEdit(product)}>Edit</button>
                                    <button
                                        className="delete"
                                        onClick={() => handleDelete(product.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default AdminDashboard;