import React, { useState, useEffect } from "react";
import Header from "./Header";
import LoadingScreen from "./LoadingScreen";
import "./OrderHistory.css";

const OrderHistoryPage = ({ getUserOrderHistories }) => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            const userOrders = await getUserOrderHistories();
            setOrders(userOrders);
            setLoading(false);
        };
        fetchOrders();
    }, []);

    if (loading) return <LoadingScreen />;

    return (
        <>
            <Header />
            <div className="order-history-page">

                {selectedOrder ? (
                    <div className="order-details">
                        <h2 className="order-heading">Order Details</h2>

                        <div className="order-summary">
                            <p><strong>Timestamp:</strong> {new Date(selectedOrder.timestamp).toLocaleString()}</p>
                            <p><strong>Total Spent:</strong> ${selectedOrder.total.toFixed(2)}</p>
                        </div>

                        <h3 className="order-heading" style={{ fontSize: "1.8rem" }}>Items:</h3>

                        <ul className="product-list">
                            {selectedOrder.order.map((item, index) => (
                                <li key={index} className="product-item">
                                    <div>{item.name} × {item.quantity}</div>
                                    <div>${(item.price * item.quantity).toFixed(2)}</div>
                                </li>
                            ))}
                        </ul>

                        <button
                            className="back-button"
                            onClick={() => setSelectedOrder(null)}
                        >
                            Back to Orders
                        </button>

                    </div>
                ) : (
                    <div>
                        {orders.length === 0 ? (
                            <p className="order-empty">No order history found 📭</p>
                        ) : (
                            <ul className="order-list">
                                {orders.map((order, index) => (
                                    <li
                                        key={index}
                                        className="order-item"
                                        onClick={() => setSelectedOrder(order)}
                                    >
                                        <div className="item-details">
                                            <strong>Order #{index + 1}</strong>
                                            <div>{new Date(order.timestamp).toLocaleDateString()}</div>
                                        </div>
                                        <div>
                                            <div className="order-total">Total: ${order.total.toFixed(2)}</div>
                                            <div className="item-quantity">
                                                {order.order.reduce((sum, item) => sum + item.quantity, 0)} items
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default OrderHistoryPage;