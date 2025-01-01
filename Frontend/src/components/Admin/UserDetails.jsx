// // import React, { useContext, useState } from "react";
// // import { AdminContext } from "../../Context/AdminContext";
// // import UserDetailsModal from "./UserDetailsModal";
// // import { toast, ToastContainer, Slide } from "react-toastify";

// // const UserDetails = () => {
// //     const { users, selectedUser, handleUserClick, closeModal, isModalOpen, blockUser } = useContext(AdminContext);

// //     // State to handle confirmation visibility
// //     const [showConfirmation, setShowConfirmation] = useState(false);

// //     // Helper function to calculate total spent by a user
// //     const calculateTotalSpent = (orders) => {
// //         return orders.reduce((total, order) => total + order.totalAmount, 0);
// //     };

// //     // Function to handle block/unblock button click
// //     const handleBlockClick = () => {
// //         setShowConfirmation(true); // Show the confirmation div
// //     };

// //     // // Function to confirm block/unblock action
// //     const confirmBlock = () => {
// //         blockUser(selectedUser.id); // Call the blockUser function from context
    
// //         // Immediately update the selectedUser's isBlocked status after blocking/unblocking
// //         const updatedUser = { ...selectedUser, isBlocked: !selectedUser.isBlocked };
// //         handleUserClick(updatedUser); // Update the selected user state
// //         setShowConfirmation(false); // Hide the confirmation div after click
    
// //         // Show the correct toast notification
// //         if (updatedUser.isBlocked) {
// //             toast.error("Blocked Successfully");
// //         } else {
// //             toast.success("Unblocked Successfully");
// //         }
// //     };

// //     const cancelBlock = () => {
// //         setShowConfirmation(false); // Just hide the confirmation div
// //     };

// //     // Close modal and reset showConfirmation state
// //     const handleModalClose = () => {
// //         setShowConfirmation(false); // Reset confirmation state when modal closes
// //         closeModal(); // Close the modal using AdminContext method
// //     };

// //     // Blocked users
// //     const blockedUsers = users.filter(user => user.isBlocked);

// //     return (
// //         <div className="admin-user-details">
// //             <ToastContainer
// //                 position="top-center"
// //                 autoClose={2000}
// //                 hideProgressBar={false}
// //                 newestOnTop={false}
// //                 closeOnClick
// //                 rtl={false}
// //                 pauseOnFocusLoss
// //                 draggable
// //                 pauseOnHover
// //                 transition={Slide}
// //             />
// //             <div className="user-Tables">
// //                 <div>
// //                     <h2>Manage Users</h2>
// //                     <div className="admin-user-table">
// //                         <table>
// //                             <thead>
// //                                 <tr>
// //                                     <th>ID</th>
// //                                     <th>Name</th>
// //                                     <th>Email</th>
// //                                     <th>Action</th>
// //                                 </tr>
// //                             </thead>
// //                             <tbody>
// //                                 {users.slice(0, 15).map((user) => (
// //                                     <tr key={user.id}>
// //                                         <td>{user.id}</td>
// //                                         <td>{user.username}</td>
// //                                         <td>{user.email}</td>
// //                                         <td>
// //                                             <button onClick={() => handleUserClick(user)}>View Details</button>
// //                                         </td>
// //                                     </tr>
// //                                 ))}
// //                             </tbody>
// //                         </table>
// //                     </div>
// //                 </div>
// //                 {/* Blocked Users */}
// //                 <div>
// //                     <h2>Blocked Users</h2>
// //                     {blockedUsers.length > 0 && (
// //                         <div className="admin-user-table">
// //                             <table>
// //                                 <thead>
// //                                     <tr>
// //                                         <th>ID</th>
// //                                         <th>Name</th>
// //                                         <th>Email</th>
// //                                         <th>Action</th>
// //                                     </tr>
// //                                 </thead>
// //                                 <tbody>
// //                                     {blockedUsers.map((user) => (
// //                                         <tr key={user.id}>
// //                                             <td>{user.id}</td>
// //                                             <td>{user.username}</td>
// //                                             <td>{user.email}</td>
// //                                             <td>
// //                                                 <button onClick={() => handleUserClick(user)}>View Details</button>
// //                                             </td>
// //                                         </tr>
// //                                     ))}
// //                                 </tbody>
// //                             </table>
// //                         </div>
// //                     )}
// //                 </div>
// //             </div>

// //             {isModalOpen && selectedUser && (
// //                 <UserDetailsModal onClose={handleModalClose}>
// //                     {" "}
// //                     {/* Use handleModalClose here */}
// //                     <div className="admin-modal-content">
// //                         <div className="userDetailsInModal">
// //                             <div className="userDetailsData">
// //                                 <p>
// //                                     <strong>Name:</strong> {selectedUser.username}
// //                                 </p>
// //                                 <p>
// //                                     <strong>ID:</strong> {selectedUser.id}
// //                                 </p>
// //                                 <p>
// //                                     <strong>Email:</strong> {selectedUser.email}
// //                                 </p>
// //                             </div>
// //                             <div className="adminBlockBtnDiv">
// //                                 <button className="adminBlockBtn" onClick={handleBlockClick}>
// //                                     {selectedUser.isBlocked ? "Unblock" : "Block"}
// //                                 </button>
// //                                 {showConfirmation && (
// //                                     <div className="confirmation-box">
// //                                         <button className="yes-btn" onClick={confirmBlock}>
// //                                             Yes
// //                                         </button>
// //                                         <button className="no-btn" onClick={cancelBlock}>
// //                                             No
// //                                         </button>
// //                                     </div>
// //                                 )}
// //                             </div>
// //                         </div>

// //                         <div className="wrapTablesInUserDetails">
// //                             <div>
// //                                 <h4>Cart Details</h4>
// //                                 <table className="admin-cart-details">
// //                                     <thead>
// //                                         <tr>
// //                                             <th>Product</th>
// //                                             <th>Quantity</th>
// //                                             <th>Price</th>
// //                                         </tr>
// //                                     </thead>
// //                                     <tbody>
// //                                         {selectedUser?.cart && selectedUser.cart.length > 0 ? (
// //                                             selectedUser.cart.map((item) => (
// //                                                 <tr key={item.id}>
// //                                                     <td>{item.name}</td>
// //                                                     <td>{item.quantity}</td>
// //                                                     <td>₹{item.price.toFixed()}</td>
// //                                                 </tr>
// //                                             ))
// //                                         ) : (
// //                                             <tr>
// //                                                 <td colSpan="3">No items in cart</td>
// //                                             </tr>
// //                                         )}
// //                                     </tbody>
// //                                 </table>
// //                             </div>
// //                             <div>
// //                                 <h4>Order Details</h4>
// //                                 <table className="admin-order-details">
// //                                     <thead>
// //                                         <tr>
// //                                             <th>Order ID</th>
// //                                             <th>Total Amount</th>
// //                                             <th>Date</th>
// //                                         </tr>
// //                                     </thead>
// //                                     <tbody>
// //                                         {selectedUser?.orders && selectedUser.orders.length > 0 ? (
// //                                             selectedUser.orders
// //                                                 .slice()
// //                                                 .reverse()
// //                                                 .map((order) => (
// //                                                     <tr key={order.id}>
// //                                                         <td>{order.id}</td>
// //                                                         <td>₹{order.totalAmount.toFixed()}</td>
// //                                                         <td>{new Date(order.date).toLocaleDateString()}</td>
// //                                                     </tr>
// //                                                 ))
// //                                         ) : (
// //                                             <tr>
// //                                                 <td colSpan="3">No orders found</td>
// //                                             </tr>
// //                                         )}
// //                                     </tbody>
// //                                 </table>
// //                             </div>
// //                         </div>

// //                         <div>
// //                             <div className="admin-user-summary">
// //                                 <div className="admin-summary-card">
// //                                     <h4>Total Orders</h4>
// //                                     <p>{selectedUser.orders.length}</p>
// //                                 </div>
// //                                 <div className="admin-summary-card">
// //                                     <h4>Total Spent</h4>
// //                                     <p>₹{calculateTotalSpent(selectedUser.orders).toFixed()}</p>
// //                                 </div>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 </UserDetailsModal>
// //             )}
// //         </div>
// //     );
// // };

// // export default UserDetails;





// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchAllUsers, fetchUserByID, blockAndUnblockUser } from "../../features/authSlice";
// import UserDetailsModal from "./UserDetailsModal";
// import { toast, ToastContainer, Slide } from "react-toastify";

// const UserDetails = () => {
//     const dispatch = useDispatch();
    
//     // Get users and selectedUser from Redux store
//     const { users, user, isModalOpen } = useSelector((state) => state.auth);

//     // State to handle confirmation visibility
//     const [showConfirmation, setShowConfirmation] = useState(false);

//     // Fetch users when the component mounts
//     useEffect(() => {
//         dispatch(fetchAllUsers({ page: 1, limit: 8 }));
//     }, [dispatch]);

//     // Helper function to calculate total spent by a user
//     const calculateTotalSpent = (orders) => {
//         return orders.reduce((total, order) => total + order.totalAmount, 0);
//     };

//     // Function to handle block/unblock button click
//     const handleBlockClick = () => {
//         setShowConfirmation(true); // Show the confirmation div
//     };

//     // Function to confirm block/unblock action
//     const confirmBlock = () => {
//         dispatch(blockAndUnblockUser(user.id)); // Call the blockUser function from Redux
        
//         // Immediately update the selectedUser's isBlocked status after blocking/unblocking
//         const updatedUser = { ...selectedUser, isBlocked: !user.isBlocked };
//         dispatch(fetchUserByID(updatedUser.id)); // Refresh the user details
//         setShowConfirmation(false); // Hide the confirmation div after click
    
//         // Show the correct toast notification
//         if (updatedUser.isBlocked) {
//             toast.error("Blocked Successfully");
//         } else {
//             toast.success("Unblocked Successfully");
//         }
//     };

//     const cancelBlock = () => {
//         setShowConfirmation(false); // Just hide the confirmation div
//     };

//     // Close modal and reset showConfirmation state
//     const handleModalClose = () => {
//         setShowConfirmation(false); // Reset confirmation state when modal closes
//         dispatch({ type: "auth/setIsModalOpen", payload: false }); // Close the modal using Redux action
//     };

//     // Blocked users
//     const blockedUsers = users.filter(user => user.isBlocked);

//     return (
//         <div className="admin-user-details">
//             <ToastContainer
//                 position="top-center"
//                 autoClose={2000}
//                 hideProgressBar={false}
//                 newestOnTop={false}
//                 closeOnClick
//                 rtl={false}
//                 pauseOnFocusLoss
//                 draggable
//                 pauseOnHover
//                 transition={Slide}
//             />
//             <div className="user-Tables">
//                 <div>
//                     <h2>Manage Users</h2>
//                     <div className="admin-user-table">
//                         <table>
//                             <thead>
//                                 <tr>
//                                     <th>ID</th>
//                                     <th>Name</th>
//                                     <th>Email</th>
//                                     <th>Action</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {users.map((user) => (
//                                     <tr key={user._id}>
//                                         <td>{user._id}</td>
//                                         <td>{user.username}</td>
//                                         <td>{user.email}</td>
//                                         <td>
//                                             <button onClick={() => dispatch(fetchUserByID(user._id))}>View Details</button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//                 {/* Blocked Users */}
//                 <div>
//                     <h2>Blocked Users</h2>
//                     {blockedUsers.length > 0 && (
//                         <div className="admin-user-table">
//                             <table>
//                                 <thead>
//                                     <tr>
//                                         <th>ID</th>
//                                         <th>Name</th>
//                                         <th>Email</th>
//                                         <th>Action</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {blockedUsers.map((user) => (
//                                         <tr key={user._id}>
//                                             <td>{user._id}</td>
//                                             <td>{user.username}</td>
//                                             <td>{user.email}</td>
//                                             <td>
//                                                 <button onClick={() => dispatch(fetchUserByID(user.id))}>View Details</button>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     )}
//                 </div>
//             </div>

//             {isModalOpen && selectedUser && (
//                 <UserDetailsModal onClose={handleModalClose}>
//                     <div className="admin-modal-content">
//                         <div className="userDetailsInModal">
//                             <div className="userDetailsData">
//                                 <p>
//                                     <strong>Name:</strong> {user.username}
//                                 </p>
//                                 <p>
//                                     <strong>ID:</strong> {user._id}
//                                 </p>
//                                 <p>
//                                     <strong>Email:</strong> {user.email}
//                                 </p>
//                             </div>
//                             <div className="adminBlockBtnDiv">
//                                 <button className="adminBlockBtn" onClick={handleBlockClick}>
//                                     {user.isBlocked ? "Unblock" : "Block"}
//                                 </button>
//                                 {showConfirmation && (
//                                     <div className="confirmation-box">
//                                         <button className="yes-btn" onClick={confirmBlock}>
//                                             Yes
//                                         </button>
//                                         <button className="no-btn" onClick={cancelBlock}>
//                                             No
//                                         </button>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>

//                         <div className="wrapTablesInUserDetails">
//                             <div>
//                                 <h4>Cart Details</h4>
//                                 <table className="admin-cart-details">
//                                     <thead>
//                                         <tr>
//                                             <th>Product</th>
//                                             <th>Quantity</th>
//                                             <th>Price</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {user?.cart && user.cart.length > 0 ? (
//                                             user.cart.map((item) => (
//                                                 <tr key={item._id}>
//                                                     <td>{item.name}</td>
//                                                     <td>{item.quantity}</td>
//                                                     <td>₹{item.price.toFixed()}</td>
//                                                 </tr>
//                                             ))
//                                         ) : (
//                                             <tr>
//                                                 <td colSpan="3">No items in cart</td>
//                                             </tr>
//                                         )}
//                                     </tbody>
//                                 </table>
//                             </div>
//                             <div>
//                                 <h4>Order Details</h4>
//                                 <table className="admin-order-details">
//                                     <thead>
//                                         <tr>
//                                             <th>Order ID</th>
//                                             <th>Total Amount</th>
//                                             <th>Date</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {user?.orders && user.orders.length > 0 ? (
//                                             user.orders
//                                                 .slice()
//                                                 .reverse()
//                                                 .map((order) => (
//                                                     <tr key={order._id}>
//                                                         <td>{order.id}</td>
//                                                         <td>₹{order.totalAmount.toFixed()}</td>
//                                                         <td>{new Date(order.date).toLocaleDateString()}</td>
//                                                     </tr>
//                                                 ))
//                                         ) : (
//                                             <tr>
//                                                 <td colSpan="3">No orders placed</td>
//                                             </tr>
//                                         )}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         </div>
//                     </div>
//                 </UserDetailsModal>
//             )}
//         </div>
//     );
// };

// export default UserDetails;




// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchAllUsers, fetchUserByID } from "../../features/authSlice";
// import { fetchCartDetails } from "../../features/cartSlice"; // Assuming cartSlice has this action
// import UserDetailsModal from "./UserDetailsModal";
// import { toast, ToastContainer, Slide } from "react-toastify";

// const UserDetails = () => {
//     const dispatch = useDispatch();
    
//     // Get users and selectedUser from Redux store
//     const { users, user } = useSelector((state) => state.auth);
//     const { cartDetails } = useSelector((state) => state.cart); // Cart data
//     const { isBlocked } = useSelector((state) => state.auth); // Block status

//     // Local state for modal visibility and selected user
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [selectedUser, setSelectedUser] = useState(null);

//     // State to handle confirmation visibility for block/unblock
//     const [showConfirmation, setShowConfirmation] = useState(false);
    
//     // Fetch users when the component mounts
//     useEffect(() => {
//         dispatch(fetchAllUsers({ page: 1, limit: 8 }));
//     }, [dispatch]);

//     // Function to handle block/unblock button click
//     const handleBlockClick = () => {
//         setShowConfirmation(true); // Show the confirmation div
//     };

//     // Function to confirm block/unblock action
//     const confirmBlock = () => {
//         // Dispatch block/unblock action here
//         dispatch(blockAndUnblockUser(selectedUser.id)); // Assuming action exists
        
//         // Close confirmation
//         setShowConfirmation(false);

//         // Show appropriate toast message
//         if (selectedUser.isBlocked) {
//             toast.error("Blocked Successfully");
//         } else {
//             toast.success("Unblocked Successfully");
//         }
//     };

//     const cancelBlock = () => {
//         setShowConfirmation(false); // Hide the confirmation div
//     };

//     // Handle opening the modal and selecting the user
//     const handleViewDetailsClick = (userId) => {
//         dispatch(fetchUserByID(userId)); // Fetch user details
//         dispatch(fetchCartDetails(userId)); // Fetch cart details for the user
//         setSelectedUser(userId);
//         setIsModalOpen(true); // Open the modal
//     };

//     // Handle modal close
//     const handleModalClose = () => {
//         setIsModalOpen(false);
//         setSelectedUser(null);
//         setShowConfirmation(false); // Reset confirmation state
//     };

//     return (
//         <div className="admin-user-details">
//             <ToastContainer
//                 position="top-center"
//                 autoClose={2000}
//                 hideProgressBar={false}
//                 newestOnTop={false}
//                 closeOnClick
//                 rtl={false}
//                 pauseOnFocusLoss
//                 draggable
//                 pauseOnHover
//                 transition={Slide}
//             />
//             <div className="user-Tables">
//                 <div>
//                     <h2>Manage Users</h2>
//                     <div className="admin-user-table">
//                         <table>
//                             <thead>
//                                 <tr>
//                                     <th>ID</th>
//                                     <th>Name</th>
//                                     <th>Email</th>
//                                     <th>Action</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {users.map((user) => (
//                                     <tr key={user._id}>
//                                         <td>{user._id}</td>
//                                         <td>{user.username}</td>
//                                         <td>{user.email}</td>
//                                         <td>
//                                             <button onClick={() => handleViewDetailsClick(user._id)}>
//                                                 View Details
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>

//                 {/* Blocked Users */}
//                 <div>
//                     <h2>Blocked Users</h2>
//                     {users.filter(user => user.isBlocked).length > 0 && (
//                         <div className="admin-user-table">
//                             <table>
//                                 <thead>
//                                     <tr>
//                                         <th>ID</th>
//                                         <th>Name</th>
//                                         <th>Email</th>
//                                         <th>Action</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {users.filter(user => user.isBlocked).map((user) => (
//                                         <tr key={user._id}>
//                                             <td>{user._id}</td>
//                                             <td>{user.username}</td>
//                                             <td>{user.email}</td>
//                                             <td>
//                                                 <button onClick={() => handleViewDetailsClick(user._id)}>
//                                                     View Details
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     )}
//                 </div>
//             </div>

//             {isModalOpen && selectedUser && (
//                 <UserDetailsModal onClose={handleModalClose}>
//                     <div className="admin-modal-content">
//                         <div className="userDetailsInModal">
//                             <div className="userDetailsData">
//                                 <p><strong>Name:</strong> {user.username}</p>
//                                 <p><strong>ID:</strong> {user._id}</p>
//                                 <p><strong>Email:</strong> {user.email}</p>
//                             </div>

//                             <div className="adminBlockBtnDiv">
//                                 <button className="adminBlockBtn" onClick={handleBlockClick}>
//                                     {user.isBlocked ? "Unblock" : "Block"}
//                                 </button>

//                                 {showConfirmation && (
//                                     <div className="confirmation-box">
//                                         <button className="yes-btn" onClick={confirmBlock}>Yes</button>
//                                         <button className="no-btn" onClick={cancelBlock}>No</button>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>

//                         <div className="wrapTablesInUserDetails">
//                             <div>
//                                 <h4>Cart Details</h4>
//                                 <table className="admin-cart-details">
//                                     <thead>
//                                         <tr>
//                                             <th>Product</th>
//                                             <th>Quantity</th>
//                                             <th>Price</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {cartDetails?.length > 0 ? (
//                                             cartDetails.map((item) => (
//                                                 <tr key={item._id}>
//                                                     <td>{item.name}</td>
//                                                     <td>{item.quantity}</td>
//                                                     <td>₹{item.price.toFixed()}</td>
//                                                 </tr>
//                                             ))
//                                         ) : (
//                                             <tr>
//                                                 <td colSpan="3">No items in cart</td>
//                                             </tr>
//                                         )}
//                                     </tbody>
//                                 </table>
//                             </div>

//                             <div>
//                                 <h4>Order Details</h4>
//                                 <table className="admin-order-details">
//                                     <thead>
//                                         <tr>
//                                             <th>Order ID</th>
//                                             <th>Total Amount</th>
//                                             <th>Date</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {user?.orders?.length > 0 ? (
//                                             user.orders.map((order) => (
//                                                 <tr key={order._id}>
//                                                     <td>{order.id}</td>
//                                                     <td>₹{order.totalAmount.toFixed()}</td>
//                                                     <td>{new Date(order.date).toLocaleDateString()}</td>
//                                                 </tr>
//                                             ))
//                                         ) : (
//                                             <tr>
//                                                 <td colSpan="3">No orders placed</td>
//                                             </tr>
//                                         )}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         </div>
//                     </div>
//                 </UserDetailsModal>
//             )}
//         </div>
//     );
// };

// export default UserDetails;






import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllUsers, fetchUserByID, blockAndUnblockUser } from "../../features/authSlice";
import { fetchCartDetailsUser } from "../../features/cartSlice"; 
import { fetchUserOrdersById } from "../../features/orderSlice";
import UserDetailsModal from "./UserDetailsModal";
import { toast, ToastContainer, Slide } from "react-toastify";

const UserDetails = () => {
    const dispatch = useDispatch();
    
    // Get users and selectedUser from Redux store
    const { users, user } = useSelector((state) => state.auth);
    const { cartUser } = useSelector((state) => state.cart);
    const { userOrder } = useSelector((state) => state.order)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    // State to handle confirmation visibility for block/unblock
    const [showConfirmation, setShowConfirmation] = useState(false);
    
    // Fetch users when the component mounts
    useEffect(() => {
        dispatch(fetchAllUsers({ page: 1, limit: 8 }));
    }, [dispatch]);

    // Function to handle block/unblock button click
    const handleBlockClick = () => {
        setShowConfirmation(true); // Show the confirmation div
    };

    // Function to confirm block/unblock action
    const confirmBlock = (userId) => {
        dispatch(blockAndUnblockUser(userId))
        .the((response) => {
            setShowConfirmation(false);
            if (selectedUser.isBlocked) {
                toast.error("Blocked Successfully");
            } else {
                toast.success("Unblocked Successfully");
            }
        })
    };

    const cancelBlock = () => {
        setShowConfirmation(false);
    };

    // Handle opening the modal and selecting the user
    const handleViewDetailsClick = (userId) => {        
        dispatch(fetchUserByID(userId)); // Fetch user details
        dispatch(fetchCartDetailsUser(userId)); // Fetch cart details for the user
        dispatch(fetchUserOrdersById(userId)); // Fetch cart details for the user
        setSelectedUser(userId);
        setIsModalOpen(true); // Open the modal
    };

    // Handle modal close
    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
        setShowConfirmation(false);
    };
    

    
    return (
        <div className="admin-user-details">
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                transition={Slide}
            />
            <div className="user-Tables">
                <div>
                    <h2>Manage Users</h2>
                    <div className="admin-user-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <button onClick={() => handleViewDetailsClick(user._id)}>
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Blocked Users */}
                <div>
                    <h2>Blocked Users</h2>
                    {users.filter(user => user.isBlocked).length > 0 && (
                        <div className="admin-user-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.filter(user => user.isBlocked).map((user) => (
                                        <tr key={user._id}>
                                            <td>{user._id}</td>
                                            <td>{user.username}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                <button onClick={() => handleViewDetailsClick(user._id)}>
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {isModalOpen && selectedUser && user && userOrder && (
                <UserDetailsModal onClose={handleModalClose}>
                    <div className="admin-modal-content">
                        <div className="userDetailsInModal">
                            <div className="userDetailsData">
                                <p><strong>Name:</strong> {user.username}</p>
                                <p><strong>ID:</strong> {user._id}</p>
                                <p><strong>Email:</strong> {user.email}</p>
                            </div>

                            <div className="adminBlockBtnDiv">
                                <button className="adminBlockBtn" onClick={handleBlockClick}>
                                    {user.isBlocked ? "Unblock" : "Block"}
                                </button>

                                {showConfirmation && (
                                    <div className="confirmation-box">
                                        <button className="yes-btn" onClick={() =>confirmBlock(user._id)}>Yes</button>
                                        <button className="no-btn" onClick={cancelBlock}>No</button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="wrapTablesInUserDetails">
                            <div>
                                <h4>Cart Details</h4>
                                <table className="admin-cart-details">
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartUser && cartUser?.length > 0 ? (
                                            cartUser?.map((item) => (
                                                <tr key={item.productId._id}>
                                                    <td>{item.productId.name}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>₹{item.productId.price}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="3">No items in cart</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            <div>
                                <h4>Order Details</h4>
                                <table className="admin-order-details">
                                    <thead>
                                        <tr>
                                            <th>Order ID</th>
                                            <th>Total Amount</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userOrder && userOrder?.length > 0 ? (
                                            userOrder.map((order) => (
                                                <tr key={order._id}>
                                                    <td>{order._id}</td>
                                                    <td>₹{order.totalAmount}</td>
                                                    <td>{order.createdAt.slice(0, 10)}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="3">No orders placed</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </UserDetailsModal>
            )}
        </div>
    );
};

export default UserDetails;
