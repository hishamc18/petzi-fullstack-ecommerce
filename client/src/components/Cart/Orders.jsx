import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserOrders, cancelOrder } from "../../features/orderSlice";

const Orders = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { orders, loading, error } = useSelector((state) => state.order);
    const { isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        if(!isAuthenticated){
            navigate('/login')
        }
        else {
            dispatch(fetchUserOrders());
        }
    }, [dispatch]);

    const handleCancelOrder = (orderId) => {
        if (window.confirm("Are you sure you want to cancel this order?")) {
            dispatch(cancelOrder(orderId))
            .then((response) => {
                dispatch(fetchUserOrders())
            })
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p className="error">Error: {error}</p>;
    }

    return (
        <div className="orders-container">
            <h2 className="orders-heading">Order History</h2>
            <button className="backButton" onClick={() => navigate("/")}>
                <i className="bx bx-home"></i>
            </button>
            {orders?.length === 0 ? (
                <p className="no-orders">No orders found.</p>
            ) : (
                <div className={`orders-list ${orders.length > 6 ? "scrollable" : ""}`}>
                    {orders.map((order) => (                        
                        <div className="order-card" key={order?._id}>
                            <h3 className="order-id">Order ID: #{order?._id}</h3>
                            <p className="orderDate">Order Date: {order?.createdAt.slice(0,10)}</p>
                            <div className="shipping-details">
                                <h4>Shipping Details:</h4>
                                <p>
                                    <strong>Full Name:</strong> {order?.shippingAddress?.fullName}
                                </p>
                                <p>
                                    <strong>Address:</strong> {order?.shippingAddress?.streetAddress}, {order?.shippingAddress?.city}, {order?.shippingAddress?.state} - {order?.shippingAddress?.postalCode}
                                </p>
                                <p>
                                    <strong>Phone:</strong> {order?.shippingAddress?.phoneNumber}
                                </p>
                            </div>
                            <div>
                                <p>
                                    <strong>Order Status:</strong> {order?.status}
                                </p>
                                <p>
                                    <strong>Payment Status:</strong> {order.razorpayPaymentStatus}
                                </p>
                            </div>
                            <div className="ordered-items">
                                <h4>Items:</h4>
                                <div className="itemsList">
                                    <ul>
                                        {order?.items?.map((item, i) => (
                                            <div className="wrapReviewandList" key={i}>
                                                <li>
                                                    <strong>{item?.productId?.name}</strong> - ₹{item?.productId?.price} x {item?.quantity}
                                                </li>
                                            </div>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="total-amount">
                                <h4>Total Amount:</h4>
                                <p>₹{Math.floor(order?.totalAmount)}</p>
                            </div>
                            <button
                                className="cancel-order"
                                onClick={() => handleCancelOrder(order?._id)}
                                disabled={["shipped", "cancelled", "delivered"].includes(order?.status)}
                            >
                                Cancel Order
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;
