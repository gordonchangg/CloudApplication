// src/data/product.jsx
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // Import Firestore

// Function to fetch products from Firestore
export const fetchProducts = async () => {
  try {
    const productsCollection = collection(db, "products"); // Reference the 'products' collection
    const querySnapshot = await getDocs(productsCollection); // Fetch all documents

    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() }); // Extract data and add to array
    });

    return products; // Return the list of products
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};