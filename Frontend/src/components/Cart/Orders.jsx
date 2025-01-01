// import React, { useContext, useState } from "react";
// import { ProductContext } from "../../Context/ProductContext";
// import { useNavigate } from "react-router-dom";
// import StarRating from "./StarRating";

// const Orders = () => {
//     const { orders } = useContext(ProductContext);
//     const navigate = useNavigate()
//     const [ratings, setRatings] = useState({});


//     const handleRatingChange = (orderId, itemId, rating) => {
//         setRatings((prevRatings) => ({
//             ...prevRatings,
//             [`${orderId}-${itemId}`]: rating,
//         }));
//     };
    
//     return (
//         <div className="orders-container">
//             <h2 className="orders-heading">Order History</h2>
//             <button className="backButton" onClick={() => navigate("/")}><i className='bx bx-home'></i></button>
//             {orders.length === 0 ? (
//                 <p className="no-orders">No orders found.</p>
//             ) : (
//                 <div className={`orders-list ${orders.length > 6 ? 'scrollable' : ''}`}>
//                     {orders.slice().reverse().map((order) => (
//                         <div className="order-card" key={order.id}>
//                             <h3 className="order-id">Order ID: #{order.id}</h3>
//                             <p className="orderDate">Order Date: {order.date}</p>
//                             <div className="shipping-details">
//                                 <h4>Shipping Details:</h4>
//                                 <p><strong>Full Name:</strong> {order.shippingDetails.fullName}</p>
//                                 <p><strong>Address:</strong> {order.shippingDetails.streetAddress}, {order.shippingDetails.city}, {order.shippingDetails.state} - {order.shippingDetails.postalCode}</p>
//                                 <p><strong>Phone:</strong> {order.shippingDetails.phoneNumber}</p>
//                             </div>
//                             <div className="ordered-items">
//                                 <h4>Items:</h4>
//                                 <div className="itemsList">
//                                     <ul>
//                                             {order.orderedItems.map((item) => (
//                                                     <div className="wrapReviewandList">
//                                                         <li key={item.id}>
//                                                             <strong>{item.name}</strong> - ₹{item.price} x {item.quantity}
//                                                             <StarRating
//                                                                 value={ratings[`${order.id}-${item.id}`] || 0} // Get the current rating or default to 0
//                                                                 onChange={(rating) => handleRatingChange(order.id, item.id, rating)} // Update the rating
//                                                             />
//                                                         </li>
//                                                     </div>
//                                             ))}
//                                     </ul>
//                                 </div>
//                             </div>
//                             <div className="total-amount">
//                                 <h4>Total Amount:</h4>
//                                 <p>₹{Math.floor(order.totalAmount)}</p>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Orders;



// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { fetchUserOrders, cancelOrder } from "../../features/orderSlice";
// import StarRating from "./StarRating";

// const Orders = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const { orders, loading, error } = useSelector((state) => state.order);
//     const [ratings, setRatings] = useState({});
//     const [currentPage, setCurrentPage] = useState(1);
//     const [limit] = useState(10); // Set a limit for pagination

//     // Fetch orders on component mount or when page changes
//     useEffect(() => {
//         dispatch(fetchUserOrders({ page: currentPage, limit }));
//     }, [dispatch, currentPage, limit]);

//     console.log(orders);
    

//     const handleRatingChange = (orderId, itemId, rating) => {
//         setRatings((prevRatings) => ({
//             ...prevRatings,
//             [`${orderId}-${itemId}`]: rating,
//         }));
//     };

//     const handleCancelOrder = (orderId) => {
//         if (window.confirm("Are you sure you want to cancel this order?")) {
//             dispatch(cancelOrder(orderId));
//         }
//     };

//     if (loading) {
//         return <p>Loading...</p>;
//     }

//     if (error) {
//         return <p className="error">Error: {error}</p>;
//     }

//     return (
//         <div className="orders-container">
//             <h2 className="orders-heading">Order History</h2>
//             <button className="backButton" onClick={() => navigate("/")}>
//                 <i className="bx bx-home"></i>
//             </button>
//             {orders.length === 0 ? (
//                 <p className="no-orders">No orders found.</p>
//             ) : (
//                 <div className={`orders-list ${orders.length > 6 ? "scrollable" : ""}`}>
//                     {orders.map((order) => (
//                         <div className="order-card" key={order.id}>
//                             <h3 className="order-id">Order ID: #{order.id}</h3>
//                             <p className="orderDate">Order Date: {order.date}</p>
//                             <div className="shipping-details">
//                                 <h4>Shipping Details:</h4>
//                                 <p>
//                                     <strong>Full Name:</strong> {order.shippingDetails.fullName}
//                                 </p>
//                                 <p>
//                                     <strong>Address:</strong> {order.shippingDetails.streetAddress},{" "}
//                                     {order.shippingDetails.city}, {order.shippingDetails.state} -{" "}
//                                     {order.shippingDetails.postalCode}
//                                 </p>
//                                 <p>
//                                     <strong>Phone:</strong> {order.shippingDetails.phoneNumber}
//                                 </p>
//                             </div>
//                             <div className="ordered-items">
//                                 <h4>Items:</h4>
//                                 <div className="itemsList">
//                                     <ul>
//                                         {order.orderedItems.map((item) => (
//                                             <div className="wrapReviewandList" key={item.id}>
//                                                 <li>
//                                                     <strong>{item.name}</strong> - ₹{item.price} x{" "}
//                                                     {item.quantity}
//                                                     <StarRating
//                                                         value={
//                                                             ratings[`${order.id}-${item.id}`] || 0
//                                                         }
//                                                         onChange={(rating) =>
//                                                             handleRatingChange(
//                                                                 order.id,
//                                                                 item.id,
//                                                                 rating
//                                                             )
//                                                         }
//                                                     />
//                                                 </li>
//                                             </div>
//                                         ))}
//                                     </ul>
//                                 </div>
//                             </div>
//                             <div className="total-amount">
//                                 <h4>Total Amount:</h4>
//                                 <p>₹{Math.floor(order.totalAmount)}</p>
//                             </div>
//                             <button
//                                 className="cancel-order"
//                                 onClick={() => handleCancelOrder(order.id)}
//                             >
//                                 Cancel Order
//                             </button>
//                         </div>
//                     ))}
//                 </div>
//             )}
//             <div className="pagination-controls">
//                 <button
//                     disabled={currentPage === 1}
//                     onClick={() => setCurrentPage((prev) => prev - 1)}
//                 >
//                     Previous
//                 </button>
//                 <span>Page {currentPage}</span>
//                 <button
//                     disabled={orders.length < limit}
//                     onClick={() => setCurrentPage((prev) => prev + 1)}
//                 >
//                     Next
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default Orders;




import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserOrders, cancelOrder } from "../../features/orderSlice";
import StarRating from "./StarRating";

const Orders = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { orders, loading, error } = useSelector((state) => state.order);
    const { isAuthenticated } = useSelector((state) => state.auth)
    const [ratings, setRatings] = useState({});

    // Fetch orders on component mount or when page changes
    useEffect(() => {
        if(!isAuthenticated){
            navigate('/login')
        }
        dispatch(fetchUserOrders());
    }, [dispatch]);

    // Log orders to check data
    useEffect(() => {
        console.log('Fetched orders:', orders);
    }, [orders]);

    const handleRatingChange = (orderId, itemId, rating) => {
        setRatings((prevRatings) => ({
            ...prevRatings,
            [`${orderId}-${itemId}`]: rating,
        }));
    };

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
                                                    <StarRating
                                                        value={ratings[`${order.id}-${item.id}`] || 0}
                                                        onChange={(rating) =>
                                                            handleRatingChange(order.id, item.id, rating)
                                                        }
                                                    />
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
