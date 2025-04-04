// src/data/product.jsx
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // Import Firestore

// Function to fetch products from Firestore
export const getUserOrderHistories = async (userId) => {
  try {
    if (!userId) {
        throw new Error("User ID is required");
    }

    const userRef = doc(db, "UserData", userId); 
    const userDoc = await getDocs(userRef); // Fetch all documents

    if (!userDoc.exists()) {
        console.warn("No order history found for this user.");
        return [];
    }

    const userData = userDoc.data();
    const orders = [];

    if (userData.orderHistory) {
        Object.values(userData.orderHistory).forEach((order) => {
          orders.push(order); // Extract each order transaction
        });
    }

    return orders; // Return the list of products
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};
