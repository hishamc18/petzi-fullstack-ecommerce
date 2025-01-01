// // import React, { useContext, useState } from "react";
// // import { ProductContext } from "../../Context/ProductContext";
// // import Modal from "react-modal";
// // import { useNavigate } from "react-router-dom";
// // import { FaCheckCircle, FaRegCreditCard } from "react-icons/fa";
// // import { FiLoader } from "react-icons/fi";
// // import { SiGooglepay } from "react-icons/si";
// // import { FaAmazonPay, FaPaypal } from "react-icons/fa";
// // import "./cartStyle.css";

// // const PaymentDetails = () => {
// //     const { cart, setCart, setOrderDetails } = useContext(ProductContext);
// //     const [isModalOpen, setIsModalOpen] = useState(false);
// //     const [isLoading, setIsLoading] = useState(false);
// //     const [isSuccess, setIsSuccess] = useState(false);
// //     const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
// //     const [upiID, setUpiID] = useState("");
// //     const [errors, setErrors] = useState({});
// //     const navigate = useNavigate();

// //     // for passing shipping details to order summary
// //     const [shippingDetails, setShippingDetails] = useState({
// //         fullName: "",
// //         streetAddress: "",
// //         city: "",
// //         state: "",
// //         postalCode: "",
// //         phoneNumber: "",
// //     });

// //     // for validating the shipping details form
// //     const validateForm = () => {
// //         let formErrors = {};

// //         Object.keys(shippingDetails).forEach((key) => {
// //             if (!shippingDetails[key]) {
// //                 formErrors[key] = `Please enter ${key.replace(/([A-Z])/g, " $1").toLowerCase()}`;
// //             }
// //         });

// //         setErrors(formErrors);
// //         return Object.keys(formErrors).length === 0; // Return true if no errors
// //     };

// //     // for submitting shipping details form
// //     const submiting = (e) => {
// //         e.preventDefault();
// //         if (validateForm()) {
// //             openModal();
// //         }
// //     };

// //     // for storing the shipping details
// //     const handleInputChange = (e) => {
// //         setShippingDetails({
// //             ...shippingDetails,
// //             [e.target.name]: e.target.value,
// //         });
// //     };

// //     const totalPrice = Array.isArray(cart) ? cart.reduce((total, item) => total + item.price * item.quantity, 0) : 0;
// //     const securedPackagingFee = 39;
// //     const finalAmount = totalPrice + securedPackagingFee;

// //     const openModal = () => {
// //         setIsModalOpen(true);
// //         setIsLoading(false);
// //         setIsSuccess(false);
// //     };

// //     const handlePayment = () => {
// //         if (!selectedPaymentMethod) {
// //             toast.info("Please select a payment method");
// //             return;
// //         }
// //         if (selectedPaymentMethod === "UPI" && !upiID) {
// //             toast.info("Please enter UPI ID");
// //             return;
// //         }
// //         setIsLoading(true);
// //         setTimeout(() => {
// //             setIsLoading(false);
// //             setIsSuccess(true);
// //             // Passing order details to OrderSummary
// //             const orderDetails = {
// //                 shippingDetails,
// //                 orderedItems: cart,
// //                 totalAmount: finalAmount,
// //             };

// //             setOrderDetails(orderDetails);

// //             setTimeout(() => {
// //                 setIsModalOpen(false);
// //                 setCart([]); // Clear cart after order
// //                 navigate("/order-summary"); // Navigate to order summary
// //             }, 2200);
// //         }, 1000);
// //     };

// //     const handlePaymentMethodChange = (e) => {
// //         setSelectedPaymentMethod(e.target.value);
// //     };

// //     return (
// //         <>
// //             <div className="price-details">
// //                 <h2>Price Details</h2>
// //                 <div className="price-item">
// //                     <span>Price ({cart.reduce((total, item) => total + item.quantity, 0)} items)</span>
// //                     <span>₹{Math.floor(totalPrice)}</span>
// //                 </div>
// //                 <div className="price-item">
// //                     <span>Delivery Charges</span>
// //                     <h4>Free</h4>
// //                 </div>
// //                 <div className="price-item">
// //                     <span>Secured Packaging Fee</span>
// //                     <span>₹{securedPackagingFee}</span>
// //                 </div>
// //                 <hr />
// //                 <div className="price-item total">
// //                     <span>Total Amount</span>
// //                     <span>₹{Math.floor(finalAmount)}</span>
// //                 </div>
// //             </div>

// //             <div className="shippingDetails">
// //                 <h2>Shipping Details</h2>
// //                 <div className="address">
// //                     <form onSubmit={submiting}>
// //                         <input
// //                             type="text"
// //                             name="fullName"
// //                             placeholder={errors.fullName || "Full Name"}
// //                             value={shippingDetails.fullName}
// //                             onChange={handleInputChange}
// //                             required
// //                         />
// //                         <input
// //                             type="text"
// //                             name="streetAddress"
// //                             placeholder={errors.streetAddress || "Street Address"}
// //                             value={shippingDetails.streetAddress}
// //                             onChange={handleInputChange}
// //                             required
// //                         />
// //                         <input
// //                             type="text"
// //                             name="city"
// //                             placeholder={errors.city || "City"}
// //                             value={shippingDetails.city}
// //                             onChange={handleInputChange}
// //                             required
// //                         />
// //                         <div className="statePin">
// //                             <input
// //                                 type="text"
// //                                 name="state"
// //                                 placeholder={errors.state || "State"}
// //                                 value={shippingDetails.state}
// //                                 onChange={handleInputChange}
// //                                 required
// //                             />
// //                             <input
// //                                 type="text"
// //                                 name="postalCode"
// //                                 placeholder={errors.postalCode || "Postal Code"}
// //                                 value={shippingDetails.postalCode}
// //                                 onChange={handleInputChange}
// //                                 required
// //                             />
// //                         </div>
// //                         <input
// //                             type="text"
// //                             name="phoneNumber"
// //                             placeholder={errors.phoneNumber || "Phone Number"}
// //                             value={shippingDetails.phoneNumber}
// //                             onChange={handleInputChange}
// //                             required
// //                         />
// //                         <button className="proceed-btn">Proceed To Payment</button>
// //                     </form>
// //                 </div>
// //             </div>

// //             <Modal
// //                 isOpen={isModalOpen}
// //                 onRequestClose={() => setIsModalOpen(false)}
// //                 contentLabel="Payment Modal"
// //                 className="custom-modal"
// //                 overlayClassName="custom-overlay"
// //             >
// //                 {isLoading ? (
// //                     <div className="loading-container">
// //                         <FiLoader className="loading-icon" />
// //                         <h3 className="processingHead">Processing Payment...</h3>
// //                         <p className="loading-text">Please wait a moment</p>
// //                     </div>
// //                 ) : isSuccess ? (
// //                     <div className="success-container">
// //                         <div className="animated-success-icon">
// //                             <FaCheckCircle className="success-icon" />
// //                         </div>
// //                         <h3 className="processingHead">Payment Successful!</h3>
// //                         <p className="success-text">Total Amount Paid: ₹{Math.floor(finalAmount)}</p>
// //                         <p className="redirect-text">Wait for your Order Summary...</p>
// //                     </div>
// //                 ) : (
// //                     <div className="payment-container">

// //                         <h2>Payment Details</h2>
// //                         <p>
// //                             Total Amount: <span>₹{Math.floor(finalAmount)}</span>
// //                         </p>
// //                         <h3>Select Payment Method:</h3>
// //                         <div className="payment-options">
// //                             <label>
// //                                 <input
// //                                     type="radio"
// //                                     value="Credit Card"
// //                                     checked={selectedPaymentMethod === "Credit Card"}
// //                                     onChange={handlePaymentMethodChange}
// //                                 />
// //                                 Credit Card
// //                                 <FaRegCreditCard className="debitcard" />
// //                             </label>
// //                             <label>
// //                                 <input
// //                                     type="radio"
// //                                     value="UPI"
// //                                     checked={selectedPaymentMethod === "UPI"}
// //                                     onChange={handlePaymentMethodChange}
// //                                 />
// //                                 UPI
// //                                 <SiGooglepay className="payIcons" />
// //                                 <FaAmazonPay className="payIcons" />
// //                                 <FaPaypal className="payIcons" />
// //                             </label>

// //                             {/* Show UPI input when UPI is selected */}
// //                             {selectedPaymentMethod === "UPI" && (
// //                                 <div className="upi-input">
// //                                     <label htmlFor="upiID">Enter UPI ID:</label>
// //                                     <input
// //                                         type="text"
// //                                         id="upiID"
// //                                         value={upiID}
// //                                         onChange={(e) => setUpiID(e.target.value)}
// //                                         placeholder="e.g. yourupi@bank"
// //                                     />
// //                                 </div>
// //                             )}

// //                             <label>
// //                                 <input
// //                                     type="radio"
// //                                     value="COD"
// //                                     checked={selectedPaymentMethod === "COD"}
// //                                     onChange={handlePaymentMethodChange}
// //                                 />
// //                                 Cash on Delivery
// //                             </label>
// //                         </div>
// //                         <button className="pay-now-btn" onClick={handlePayment} disabled={!selectedPaymentMethod}>
// //                             Pay Now
// //                         </button>
// //                     </div>
// //                 )}
// //             </Modal>
// //         </>
// //     );
// // };

// // export default PaymentDetails;

// // import React, { useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { placeOrder } from "../../features/orderSlice";
// // import { useNavigate } from "react-router-dom";
// // import { toast } from "react-toastify"; // Optional, for user feedback
// // import { FaRegCreditCard } from "react-icons/fa";
// // import { SiGooglepay } from "react-icons/si";
// // import { FaAmazonPay, FaPaypal } from "react-icons/fa";
// // import "./cartStyle.css";

// // const PaymentDetails = () => {
// //     const dispatch = useDispatch();
// //     const navigate = useNavigate();

// //     const [shippingDetails, setShippingDetails] = useState({
// //         fullName: "",
// //         streetAddress: "",
// //         city: "",
// //         state: "",
// //         postalCode: "",
// //         phoneNumber: "",
// //     });

// //     const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
// //     const [upiID, setUpiID] = useState("");
// //     const [errors, setErrors] = useState({});

// //     const { cart } = useSelector((state) => state.cart); // Assuming cart is stored in Redux state
// //     const totalPrice = cart ? cart.items.reduce((total, item) => total + item.price * item.quantity, 0) : 0;
// //     const securedPackagingFee = 39;
// //     const finalAmount = totalPrice + securedPackagingFee;

// //     // Validate shipping details
// //     const validateForm = () => {
// //         let formErrors = {};
// //         Object.keys(shippingDetails).forEach((key) => {
// //             if (!shippingDetails[key]) {
// //                 formErrors[key] = `Please enter ${key.replace(/([A-Z])/g, " $1").toLowerCase()}`;
// //             }
// //         });
// //         setErrors(formErrors);
// //         return Object.keys(formErrors).length === 0; // Return true if no errors
// //     };

// //     // Handle form submission
// //     const handleSubmit = (e) => {
// //         e.preventDefault();
// //         if (validateForm()) {
// //             initiatePayment();
// //         }
// //     };

// //     // Handle payment method selection
// //     const handlePaymentMethodChange = (e) => {
// //         setSelectedPaymentMethod(e.target.value);
// //     };

// //     // Initialize Razorpay and handle order submission
// //     const initiatePayment = () => {
// //         if (!selectedPaymentMethod) {
// //             toast.info("Please select a payment method");
// //             return;
// //         }
// //         if (selectedPaymentMethod === "UPI" && !upiID) {
// //             toast.info("Please enter UPI ID");
// //             return;
// //         }

// //         // Call Razorpay SDK here
// //         const options = {
// //             key: "your-razorpay-key", // Replace with your Razorpay key
// //             amount: finalAmount * 100, // Amount in paisa
// //             currency: "INR",
// //             name: "Your Company",
// //             description: "Order Payment",
// //             handler: function (response) {
// //                 // After successful payment, place the order in the Redux state
// //                 const orderData = {
// //                     shippingDetails,
// //                     orderedItems: cart,
// //                     totalAmount: finalAmount,
// //                     paymentId: response.razorpay_payment_id,
// //                 };
// //                 dispatch(placeOrder(orderData)); // Dispatch the action to store the order
// //                 navigate("/order-summary"); // Redirect to the order summary page
// //             },
// //             prefill: {
// //                 name: shippingDetails.fullName,
// //                 email: "", // Optionally pre-fill the user's email if available
// //                 contact: shippingDetails.phoneNumber,
// //             },
// //             theme: {
// //                 color: "#F37254",
// //             },
// //         };

// //         const razorpay = new window.Razorpay(options);
// //         razorpay.open(); // Open Razorpay payment modal
// //     };

// //     return (
// //         <>
// //             <div className="price-details">
// //                 <h2>Price Details</h2>
// //                 <div className="price-item">
// //                     <span>Price ({cart?.items?.reduce((total, item) => total + item.quantity, 0)} items)</span>
// //                     <span>₹{Math.floor(totalPrice)}</span>
// //                 </div>
// //                 <div className="price-item">
// //                     <span>Delivery Charges</span>
// //                     <h4>Free</h4>
// //                 </div>
// //                 <div className="price-item">
// //                     <span>Secured Packaging Fee</span>
// //                     <span>₹{securedPackagingFee}</span>
// //                 </div>
// //                 <hr />
// //                 <div className="price-item total">
// //                     <span>Total Amount</span>
// //                     <span>₹{Math.floor(finalAmount)}</span>
// //                 </div>
// //             </div>

// //             <div className="shippingDetails">
// //                 <h2>Shipping Details</h2>
// //                 <form onSubmit={handleSubmit}>
// //                     <input
// //                         type="text"
// //                         name="fullName"
// //                         placeholder={errors.fullName || "Full Name"}
// //                         value={shippingDetails.fullName}
// //                         onChange={(e) => setShippingDetails({ ...shippingDetails, fullName: e.target.value })}
// //                         required
// //                     />
// //                     <input
// //                         type="text"
// //                         name="streetAddress"
// //                         placeholder={errors.streetAddress || "Street Address"}
// //                         value={shippingDetails.streetAddress}
// //                         onChange={(e) => setShippingDetails({ ...shippingDetails, streetAddress: e.target.value })}
// //                         required
// //                     />
// //                     <input
// //                         type="text"
// //                         name="city"
// //                         placeholder={errors.city || "City"}
// //                         value={shippingDetails.city}
// //                         onChange={(e) => setShippingDetails({ ...shippingDetails, city: e.target.value })}
// //                         required
// //                     />
// //                     <div className="statePin">
// //                         <input
// //                             type="text"
// //                             name="state"
// //                             placeholder={errors.state || "State"}
// //                             value={shippingDetails.state}
// //                             onChange={(e) => setShippingDetails({ ...shippingDetails, state: e.target.value })}
// //                             required
// //                         />
// //                         <input
// //                             type="text"
// //                             name="postalCode"
// //                             placeholder={errors.postalCode || "Postal Code"}
// //                             value={shippingDetails.postalCode}
// //                             onChange={(e) => setShippingDetails({ ...shippingDetails, postalCode: e.target.value })}
// //                             required
// //                         />
// //                     </div>
// //                     <input
// //                         type="text"
// //                         name="phoneNumber"
// //                         placeholder={errors.phoneNumber || "Phone Number"}
// //                         value={shippingDetails.phoneNumber}
// //                         onChange={(e) => setShippingDetails({ ...shippingDetails, phoneNumber: e.target.value })}
// //                         required
// //                     />
// //                     <button className="proceed-btn" type="submit">Proceed To Payment</button>
// //                 </form>
// //             </div>

// //             <div className="payment-options">
// //                 <h3>Select Payment Method:</h3>
// //                 <label>
// //                     <input
// //                         type="radio"
// //                         value="Credit Card"
// //                         checked={selectedPaymentMethod === "Credit Card"}
// //                         onChange={handlePaymentMethodChange}
// //                     />
// //                     Credit Card
// //                     <FaRegCreditCard className="debitcard" />
// //                 </label>
// //                 <label>
// //                     <input
// //                         type="radio"
// //                         value="UPI"
// //                         checked={selectedPaymentMethod === "UPI"}
// //                         onChange={handlePaymentMethodChange}
// //                     />
// //                     UPI
// //                     <SiGooglepay className="payIcons" />
// //                     <FaAmazonPay className="payIcons" />
// //                     <FaPaypal className="payIcons" />
// //                 </label>

// //                 {/* Show UPI input when UPI is selected */}
// //                 {selectedPaymentMethod === "UPI" && (
// //                     <div className="upi-input">
// //                         <label htmlFor="upiID">Enter UPI ID:</label>
// //                         <input
// //                             type="text"
// //                             id="upiID"
// //                             value={upiID}
// //                             onChange={(e) => setUpiID(e.target.value)}
// //                             placeholder="e.g. yourupi@bank"
// //                         />
// //                     </div>
// //                 )}

// //                 <label>
// //                     <input
// //                         type="radio"
// //                         value="COD"
// //                         checked={selectedPaymentMethod === "COD"}
// //                         onChange={handlePaymentMethodChange}
// //                     />
// //                     Cash on Delivery
// //                 </label>
// //             </div>
// //         </>
// //     );
// // };

// // export default PaymentDetails;

// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { placeOrder } from "../../features/orderSlice";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify"; // Optional, for user feedback
// import "./cartStyle.css";

// const PaymentDetails = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const [shippingDetails, setShippingDetails] = useState({
//         fullName: "",
//         streetAddress: "",
//         city: "",
//         state: "",
//         postalCode: "",
//         phoneNumber: "",
//     });

//     const [errors, setErrors] = useState({});

//     const { cart } = useSelector((state) => state.cart); // Assuming cart is stored in Redux state
//     const totalPrice = cart ? cart.items.reduce((total, item) => total + item.price * item.quantity, 0) : 0;
//     const securedPackagingFee = 39;
//     const finalAmount = totalPrice + securedPackagingFee;

//     // Validate shipping details
//     const validateForm = () => {
//         let formErrors = {};
//         Object.keys(shippingDetails).forEach((key) => {
//             if (!shippingDetails[key]) {
//                 formErrors[key] = `Please enter ${key.replace(/([A-Z])/g, " $1").toLowerCase()}`;
//             }
//         });
//         setErrors(formErrors);
//         return Object.keys(formErrors).length === 0; // Return true if no errors
//     };

//     // Handle form submission
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (validateForm()) {
//             initiatePayment();
//         }
//     };

//     // Initialize Razorpay and handle order submission
//     const initiatePayment = () => {
//         // Call Razorpay SDK here
//         const options = {
//             key: "your-razorpay-key", // Replace with your Razorpay key
//             amount: finalAmount * 100, // Amount in paisa
//             currency: "INR",
//             name: "Your Company",
//             description: "Order Payment",
//             handler: function (response) {
//                 // After successful payment, place the order in the Redux state
//                 const orderData = {
//                     shippingDetails,
//                     orderedItems: cart,
//                     totalAmount: finalAmount,
//                     paymentId: response.razorpay_payment_id,
//                 };
//                 dispatch(placeOrder(orderData)); // Dispatch the action to store the order
//                 navigate("/order-summary"); // Redirect to the order summary page
//             },
//             prefill: {
//                 name: shippingDetails.fullName,
//                 email: "", // Optionally pre-fill the user's email if available
//                 contact: shippingDetails.phoneNumber,
//             },
//             theme: {
//                 color: "#F37254",
//             },
//         };

//         const razorpay = new window.Razorpay(options);
//         razorpay.open(); // Open Razorpay payment modal
//     };

//     return (
//         <>
//             <div className="price-details">
//                 <h2>Price Details</h2>
//                 <div className="price-item">
//                     <span>Price ({cart?.items?.reduce((total, item) => total + item.quantity, 0)} items)</span>
//                     <span>₹{Math.floor(totalPrice)}</span>
//                 </div>
//                 <div className="price-item">
//                     <span>Delivery Charges</span>
//                     <h4>Free</h4>
//                 </div>
//                 <div className="price-item">
//                     <span>Secured Packaging Fee</span>
//                     <span>₹{securedPackagingFee}</span>
//                 </div>
//                 <hr />
//                 <div className="price-item total">
//                     <span>Total Amount</span>
//                     <span>₹{Math.floor(finalAmount)}</span>
//                 </div>
//             </div>

//             <div className="shippingDetails">
//                 <h2>Shipping Details</h2>
//                 <form onSubmit={handleSubmit}>
//                     <input
//                         type="text"
//                         name="fullName"
//                         placeholder={errors.fullName || "Full Name"}
//                         value={shippingDetails.fullName}
//                         onChange={(e) => setShippingDetails({ ...shippingDetails, fullName: e.target.value })}
//                         required
//                     />
//                     <input
//                         type="text"
//                         name="streetAddress"
//                         placeholder={errors.streetAddress || "Street Address"}
//                         value={shippingDetails.streetAddress}
//                         onChange={(e) => setShippingDetails({ ...shippingDetails, streetAddress: e.target.value })}
//                         required
//                     />
//                     <input
//                         type="text"
//                         name="city"
//                         placeholder={errors.city || "City"}
//                         value={shippingDetails.city}
//                         onChange={(e) => setShippingDetails({ ...shippingDetails, city: e.target.value })}
//                         required
//                     />
//                     <div className="statePin">
//                         <input
//                             type="text"
//                             name="state"
//                             placeholder={errors.state || "State"}
//                             value={shippingDetails.state}
//                             onChange={(e) => setShippingDetails({ ...shippingDetails, state: e.target.value })}
//                             required
//                         />
//                         <input
//                             type="text"
//                             name="postalCode"
//                             placeholder={errors.postalCode || "Postal Code"}
//                             value={shippingDetails.postalCode}
//                             onChange={(e) => setShippingDetails({ ...shippingDetails, postalCode: e.target.value })}
//                             required
//                         />
//                     </div>
//                     <input
//                         type="text"
//                         name="phoneNumber"
//                         placeholder={errors.phoneNumber || "Phone Number"}
//                         value={shippingDetails.phoneNumber}
//                         onChange={(e) => setShippingDetails({ ...shippingDetails, phoneNumber: e.target.value })}
//                         required
//                     />
//                     <button className="proceed-btn" type="submit">Proceed To Payment</button>
//                 </form>
//             </div>

//         </>
//     );
// };

// export default PaymentDetails;

// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { placeOrder } from "../../features/orderSlice";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify"; // Optional, for user feedback
// import "./cartStyle.css";

// const PaymentDetails = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const [shippingDetails, setShippingDetails] = useState({
//         fullName: "",
//         streetAddress: "",
//         city: "",
//         state: "",
//         postalCode: "",
//         phoneNumber: "",
//     });

//     const [errors, setErrors] = useState({});

//     const { cart } = useSelector((state) => state.cart); // Assuming cart is stored in Redux state
//     const totalPrice = cart ? cart.items.reduce((total, item) => total + item.productId.price * item.quantity, 0) : 0;
//     const securedPackagingFee = 39;
//     const finalAmount = totalPrice + securedPackagingFee;

//     // Validate shipping details
//     const validateForm = () => {
//         let formErrors = {};
//         Object.keys(shippingDetails).forEach((key) => {
//             if (!shippingDetails[key]) {
//                 formErrors[key] = `Please enter ${key.replace(/([A-Z])/g, " $1").toLowerCase()}`;
//             }
//         });
//         setErrors(formErrors);
//         return Object.keys(formErrors).length === 0; // Return true if no errors
//     };

//     // Handle form submission
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (validateForm()) {
//             // Proceed with order submission
//             const orderData = {
//                 shippingDetails,
//                 orderedItems: cart,
//                 totalAmount: finalAmount,
//             };
//             dispatch(placeOrder(orderData)); // Dispatch the action to store the order
//             navigate("/order-summary"); // Redirect to the order summary page
//         }
//     };

//     // Handle input change for shipping details
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setShippingDetails({
//             ...shippingDetails,
//             [name]: value,
//         });
//     };

//     return (
//         <>
//             <div className="price-details">
//                 <h2>Price Details</h2>
//                 <div className="price-item">
//                     <span>Price ({cart?.items?.reduce((total, item) => total + item.quantity, 0)} items)</span>
//                     <span>₹{Math.floor(totalPrice)}</span>
//                 </div>
//                 <div className="price-item">
//                     <span>Delivery Charges</span>
//                     <h4>Free</h4>
//                 </div>
//                 <div className="price-item">
//                     <span>Secured Packaging Fee</span>
//                     <span>₹{securedPackagingFee}</span>
//                 </div>
//                 <hr />
//                 <div className="price-item total">
//                     <span>Total Amount</span>
//                     <span>₹{Math.floor(finalAmount)}</span>
//                 </div>
//             </div>

//             <div className="shippingDetails">
//                 <h2>Shipping Details</h2>
//                 <div className="address">
//                     <form onSubmit={handleSubmit}>
//                         <input
//                             type="text"
//                             name="fullName"
//                             placeholder={errors.fullName || "Full Name"}
//                             value={shippingDetails.fullName}
//                             onChange={handleInputChange}
//                             required
//                         />
//                         <input
//                             type="text"
//                             name="streetAddress"
//                             placeholder={errors.streetAddress || "Street Address"}
//                             value={shippingDetails.streetAddress}
//                             onChange={handleInputChange}
//                             required
//                         />
//                         <input
//                             type="text"
//                             name="city"
//                             placeholder={errors.city || "City"}
//                             value={shippingDetails.city}
//                             onChange={handleInputChange}
//                             required
//                         />
//                         <div className="statePin">
//                             <input
//                                 type="text"
//                                 name="state"
//                                 placeholder={errors.state || "State"}
//                                 value={shippingDetails.state}
//                                 onChange={handleInputChange}
//                                 required
//                             />
//                             <input
//                                 type="text"
//                                 name="postalCode"
//                                 placeholder={errors.postalCode || "Postal Code"}
//                                 value={shippingDetails.postalCode}
//                                 onChange={handleInputChange}
//                                 required
//                             />
//                         </div>
//                         <input
//                             type="text"
//                             name="phoneNumber"
//                             placeholder={errors.phoneNumber || "Phone Number"}
//                             value={shippingDetails.phoneNumber}
//                             onChange={handleInputChange}
//                             required
//                         />
//                         <button className="proceed-btn">Proceed To Payment</button>
//                     </form>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default PaymentDetails;

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { placeOrder } from "../../features/orderSlice";
// import { useNavigate } from "react-router-dom";
// import { fetchCartDetails } from "../../features/cartSlice"; // Ensure you import the correct action
// import "./cartStyle.css";

// const PaymentDetails = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const [shippingDetails, setShippingDetails] = useState({
//         fullName: "",
//         streetAddress: "",
//         city: "",
//         state: "",
//         postalCode: "",
//         phoneNumber: "",
//     });

//     const [errors, setErrors] = useState({});

//     // Fetch cart state from Redux store
//     const { cart, loading, error } = useSelector((state) => state.cart);

//     useEffect(() => {
//         if (!cart || cart.items?.length === 0) {
//             dispatch(fetchCartDetails())
//                 .unwrap()
//                 .then((data) => {
//                     console.log('Cart fetched successfully:', data);
//                 })
//                 .catch((error) => {
//                     console.error('Error fetching cart:', error);
//                 });
//         }
//     }, [dispatch, cart]);

//     console.log("Cart:", cart);

//     const securedPackagingFee = 39;
//     const finalAmount = cart?.totalPrice + securedPackagingFee;

//     // Validate shipping details
//     const validateForm = () => {
//         let formErrors = {};
//         Object.keys(shippingDetails).forEach((key) => {
//             if (!shippingDetails[key]) {
//                 formErrors[key] = `Please enter ${key.replace(/([A-Z])/g, " $1").toLowerCase()}`;
//             }
//         });
//         setErrors(formErrors);
//         return Object.keys(formErrors).length === 0; // Return true if no errors
//     };

//     // Handle form submission
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (validateForm()) {
//             // Proceed with order submission
//             const orderData = {
//                 shippingDetails,
//                 orderedItems: cart?.items || [],
//                 totalAmount: finalAmount,
//             };
//             dispatch(placeOrder(orderData));
//             navigate("/order-summary");
//         }
//     };

//     // Handle input change for shipping details
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setShippingDetails({
//             ...shippingDetails,
//             [name]: value,
//         });
//     };

//     // Show loading state or error state if cart is being fetched
//     if (loading) {
//         return <div>Loading cart details...</div>;
//     }

//     return (
//         <>
//             <div className="price-details">
//                 <h2>Price Details</h2>
//                 <div className="price-item">
//                     <span>Price ({cart?.items?.length} items)</span>
//                     <span>₹{Math.floor(cart?.totalPrice)}</span>
//                 </div>
//                 <div className="price-item">
//                     <span>Delivery Charges</span>
//                     <h4>Free</h4>
//                 </div>
//                 <div className="price-item">
//                     <span>Secured Packaging Fee</span>
//                     <span>₹{securedPackagingFee}</span>
//                 </div>
//                 <hr />
//                 <div className="price-item total">
//                     <span>Total Amount</span>
//                     <span>₹{Math.floor(finalAmount)}</span>
//                 </div>
//             </div>

//             <div className="shippingDetails">
//                 <h2>Shipping Details</h2>
//                 <div className="address">
//                     <form onSubmit={handleSubmit}>
//                         <input
//                             type="text"
//                             name="fullName"
//                             placeholder={errors.fullName || "Full Name"}
//                             value={shippingDetails.fullName}
//                             onChange={handleInputChange}
//                             required
//                         />
//                         <input
//                             type="text"
//                             name="streetAddress"
//                             placeholder={errors.streetAddress || "Street Address"}
//                             value={shippingDetails.streetAddress}
//                             onChange={handleInputChange}
//                             required
//                         />
//                         <input
//                             type="text"
//                             name="city"
//                             placeholder={errors.city || "City"}
//                             value={shippingDetails.city}
//                             onChange={handleInputChange}
//                             required
//                         />
//                         <div className="statePin">
//                             <input
//                                 type="text"
//                                 name="state"
//                                 placeholder={errors.state || "State"}
//                                 value={shippingDetails.state}
//                                 onChange={handleInputChange}
//                                 required
//                             />
//                             <input
//                                 type="text"
//                                 name="postalCode"
//                                 placeholder={errors.postalCode || "Postal Code"}
//                                 value={shippingDetails.postalCode}
//                                 onChange={handleInputChange}
//                                 required
//                             />
//                         </div>
//                         <input
//                             type="text"
//                             name="phoneNumber"
//                             placeholder={errors.phoneNumber || "Phone Number"}
//                             value={shippingDetails.phoneNumber}
//                             onChange={handleInputChange}
//                             required
//                         />
//                         <button className="proceed-btn">Proceed To Payment</button>
//                     </form>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default PaymentDetails;

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { placeOrder, verifyPayment } from "../../features/orderSlice";
// import { useNavigate } from "react-router-dom";
// import { fetchCartDetails } from "../../features/cartSlice"; // Ensure you import the correct action
// import "./cartStyle.css";

// const PaymentDetails = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const [shippingDetails, setShippingDetails] = useState({
//         fullName: "",
//         streetAddress: "",
//         city: "",
//         state: "",
//         postalCode: "",
//         phoneNumber: "",
//         country: 'INDIA'
//     });

//     const [errors, setErrors] = useState({});
//     const [isSubmitting, setIsSubmitting] = useState(false);  // To handle the payment submission

//     // Fetch cart state from Redux store
//     const { cart, loading, error } = useSelector((state) => state.cart);

//     useEffect(() => {
//         if (!cart || cart.items?.length === 0) {
//             dispatch(fetchCartDetails())
//                 .unwrap()
//                 .then((data) => {
//                     console.log('Cart fetched successfully:', data);
//                 })
//                 .catch((error) => {
//                     console.error('Error fetching cart:', error);
//                 });
//         }
//     }, [dispatch, cart]);

//     const securedPackagingFee = 39;
//     const finalAmount = cart?.totalPrice + securedPackagingFee;

//     // Validate shipping details
//     const validateForm = () => {
//         let formErrors = {};
//         Object.keys(shippingDetails).forEach((key) => {
//             if (!shippingDetails[key]) {
//                 formErrors[key] = `Please enter ${key.replace(/([A-Z])/g, " $1").toLowerCase()}`;
//             }
//         });
//         setErrors(formErrors);
//         return Object.keys(formErrors).length === 0; // Return true if no errors
//     };

//     // Handle form submission
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (validateForm()) {
//             setIsSubmitting(true);
//             const orderData = {
//                 ...shippingDetails,
//                         country: 'INDIA',
//                 orderedItems: cart?.items || [],
//                 totalAmount: finalAmount,
//             };

//             dispatch(placeOrder(orderData))
//                 .unwrap()
//                 .then((response) => {
//                     if (response.razorpayOrderId) {
//                         openRazorpayPayment(response.razorpayOrderId, finalAmount);
//                     }
//                 })
//                 .catch((error) => {
//                     console.error('Error creating order:', error);
//                     setIsSubmitting(false);
//                 });
//         }
//     };

//     // Handle Razorpay payment
//     const openRazorpayPayment = (razorpayOrderId, amount) => {
//         const options = {
//             key: 'YOUR_RAZORPAY_KEY', // Replace with your Razorpay key
//             amount: amount * 100, // Amount in paise
//             currency: 'INR',
//             name: 'Your Store Name',
//             description: 'Test Transaction',
//             order_id: razorpayOrderId,
//             handler: function (response) {
//                 const paymentData = {
//                     paymentId: response.razorpay_payment_id,
//                     orderId: razorpayOrderId,
//                 };
//                 dispatch(verifyPayment(paymentData))
//                     .unwrap()
//                     .then(() => {
//                         navigate('/order-summary'); // Navigate to order summary on success
//                     })
//                     .catch((error) => {
//                         console.error('Payment verification failed:', error);
//                     });
//             },
//             prefill: {
//                 name: shippingDetails.fullName,
//                 email: '', // Add email if needed
//                 contact: shippingDetails.phoneNumber,
//             },
//             theme: {
//                 color: '#F37254', // Customize theme color
//             },
//         };

//         const razorpay = new window.Razorpay(options);
//         razorpay.open();
//     };

//     // Handle input change for shipping details
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setShippingDetails({
//             ...shippingDetails,
//             [name]: value,
//         });
//     };

//     // Show loading state or error state if cart is being fetched
//     if (loading) {
//         return <div>Loading cart details...</div>;
//     }

//     return (
//         <>
//             <div className="price-details">
//                 <h2>Price Details</h2>
//                 <div className="price-item">
//                     <span>Price ({cart?.items?.length} items)</span>
//                     <span>₹{Math.floor(cart?.totalPrice)}</span>
//                 </div>
//                 <div className="price-item">
//                     <span>Delivery Charges</span>
//                     <h4>Free</h4>
//                 </div>
//                 <div className="price-item">
//                     <span>Secured Packaging Fee</span>
//                     <span>₹{securedPackagingFee}</span>
//                 </div>
//                 <hr />
//                 <div className="price-item total">
//                     <span>Total Amount</span>
//                     <span>₹{Math.floor(finalAmount)}</span>
//                 </div>
//             </div>

//             <div className="shippingDetails">
//                 <h2>Shipping Details</h2>
//                 <div className="address">
//                     <form onSubmit={handleSubmit}>
//                         <input
//                             type="text"
//                             name="fullName"
//                             placeholder={errors.fullName || "Full Name"}
//                             value={shippingDetails.fullName}
//                             onChange={handleInputChange}
//                             required
//                         />
//                         <input
//                             type="text"
//                             name="streetAddress"
//                             placeholder={errors.streetAddress || "Street Address"}
//                             value={shippingDetails.streetAddress}
//                             onChange={handleInputChange}
//                             required
//                         />
//                         <input
//                             type="text"
//                             name="city"
//                             placeholder={errors.city || "City"}
//                             value={shippingDetails.city}
//                             onChange={handleInputChange}
//                             required
//                         />
//                         <div className="statePin">
//                             <input
//                                 type="text"
//                                 name="state"
//                                 placeholder={errors.state || "State"}
//                                 value={shippingDetails.state}
//                                 onChange={handleInputChange}
//                                 required
//                             />
//                             <input
//                                 type="text"
//                                 name="postalCode"
//                                 placeholder={errors.postalCode || "Postal Code"}
//                                 value={shippingDetails.postalCode}
//                                 onChange={handleInputChange}
//                                 required
//                             />
//                         </div>
//                         <input
//                             type="text"
//                             name="phoneNumber"
//                             placeholder={errors.phoneNumber || "Phone Number"}
//                             value={shippingDetails.phoneNumber}
//                             onChange={handleInputChange}
//                             required
//                         />
//                         <button className="proceed-btn" disabled={isSubmitting}>
//                             {isSubmitting ? 'Processing Payment...' : 'Proceed To Payment'}
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default PaymentDetails;

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { placeOrder, verifyPayment } from "../../features/orderSlice";
// import { useNavigate } from "react-router-dom";
// import { fetchCartDetails } from "../../features/cartSlice"; // Ensure you import the correct action
// import "./cartStyle.css";

// const PaymentDetails = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const [shippingDetails, setShippingDetails] = useState({
//         fullName: "",
//         streetAddress: "",
//         city: "",
//         state: "",
//         postalCode: "",
//         phoneNumber: "",
//         country: 'INDIA'
//     });

//     const [errors, setErrors] = useState({});
//     const [isSubmitting, setIsSubmitting] = useState(false);  // To handle the payment submission

//     // Fetch cart state from Redux store
//     const { cart, loading, error } = useSelector((state) => state.cart);

//     useEffect(() => {
//         if (!cart || cart.items?.length === 0) {
//             dispatch(fetchCartDetails())
//                 .unwrap()
//                 .then((data) => {
//                     console.log('Cart fetched successfully:', data);
//                 })
//                 .catch((error) => {
//                     console.error('Error fetching cart:', error);
//                 });
//         }
//     }, [dispatch, cart]);

//     const securedPackagingFee = 39;
//     const finalAmount = cart?.totalPrice + securedPackagingFee;

//     // Validate shipping details
//     const validateForm = () => {
//         let formErrors = {};
//         Object.keys(shippingDetails).forEach((key) => {
//             if (!shippingDetails[key]) {
//                 formErrors[key] = `Please enter ${key.replace(/([A-Z])/g, " $1").toLowerCase()}`;
//             }
//         });
//         setErrors(formErrors);
//         return Object.keys(formErrors).length === 0; // Return true if no errors
//     };

//     // Handle form submission
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (validateForm()) {
//             setIsSubmitting(true);
//             const orderData = {
//                 shippingAddress: { // Restructure shipping details into shippingAddress
//                     fullName: shippingDetails.fullName,
//                     streetAddress: shippingDetails.streetAddress,
//                     city: shippingDetails.city,
//                     state: shippingDetails.state,
//                     postalCode: shippingDetails.postalCode,
//                     phoneNumber: shippingDetails.phoneNumber,
//                     country: shippingDetails.country
//                 },
//                 orderedItems: cart?.items || [],
//                 totalAmount: finalAmount,
//                 paymentMethod: 'razorpay', // Add paymentMethod
//                 status: 'placed' // Ensure status is valid
//             };

//             dispatch(placeOrder(orderData))
//                 .unwrap()
//                 .then((response) => {
//                     if (response.razorpayOrderId) {
//                         openRazorpayPayment(response.razorpayOrderId, finalAmount);
//                     }
//                 })
//                 .catch((error) => {
//                     console.error('Error creating order:', error);
//                     setIsSubmitting(false);
//                 });
//         }
//     };

//     // Handle Razorpay payment
//     const openRazorpayPayment = (razorpayOrderId, amount) => {
//         const options = {
//             key: 'YOUR_RAZORPAY_KEY', // Replace with your Razorpay key
//             amount: amount * 100, // Amount in paise
//             currency: 'INR',
//             name: 'Your Store Name',
//             description: 'Test Transaction',
//             order_id: razorpayOrderId,
//             handler: function (response) {
//                 const paymentData = {
//                     paymentId: response.razorpay_payment_id,
//                     orderId: razorpayOrderId,
//                 };
//                 dispatch(verifyPayment(paymentData))
//                     .unwrap()
//                     .then(() => {
//                         navigate('/order-summary'); // Navigate to order summary on success
//                     })
//                     .catch((error) => {
//                         console.error('Payment verification failed:', error);
//                     });
//             },
//             prefill: {
//                 name: shippingDetails.fullName,
//                 email: '', // Add email if needed
//                 contact: shippingDetails.phoneNumber,
//             },
//             theme: {
//                 color: '#F37254', // Customize theme color
//             },
//         };

//         const razorpay = new window.Razorpay(options);
//         razorpay.open();
//     };

//     // Handle input change for shipping details
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setShippingDetails({
//             ...shippingDetails,
//             [name]: value,
//         });
//     };

//     // Show loading state or error state if cart is being fetched
//     if (loading) {
//         return <div>Loading cart details...</div>;
//     }

//     return (
//         <>
//             <div className="price-details">
//                 <h2>Price Details</h2>
//                 <div className="price-item">
//                     <span>Price ({cart?.items?.length} items)</span>
//                     <span>₹{Math.floor(cart?.totalPrice)}</span>
//                 </div>
//                 <div className="price-item">
//                     <span>Delivery Charges</span>
//                     <h4>Free</h4>
//                 </div>
//                 <div className="price-item">
//                     <span>Secured Packaging Fee</span>
//                     <span>₹{securedPackagingFee}</span>
//                 </div>
//                 <hr />
//                 <div className="price-item total">
//                     <span>Total Amount</span>
//                     <span>₹{Math.floor(finalAmount)}</span>
//                 </div>
//             </div>

//             <div className="shippingDetails">
//                 <h2>Shipping Details</h2>
//                 <div className="address">
//                     <form onSubmit={handleSubmit}>
//                         <input
//                             type="text"
//                             name="fullName"
//                             placeholder={errors.fullName || "Full Name"}
//                             value={shippingDetails.fullName}
//                             onChange={handleInputChange}
//                             required
//                         />
//                         <input
//                             type="text"
//                             name="streetAddress"
//                             placeholder={errors.streetAddress || "Street Address"}
//                             value={shippingDetails.streetAddress}
//                             onChange={handleInputChange}
//                             required
//                         />
//                         <input
//                             type="text"
//                             name="city"
//                             placeholder={errors.city || "City"}
//                             value={shippingDetails.city}
//                             onChange={handleInputChange}
//                             required
//                         />
//                         <div className="statePin">
//                             <input
//                                 type="text"
//                                 name="state"
//                                 placeholder={errors.state || "State"}
//                                 value={shippingDetails.state}
//                                 onChange={handleInputChange}
//                                 required
//                             />
//                             <input
//                                 type="text"
//                                 name="postalCode"
//                                 placeholder={errors.postalCode || "Postal Code"}
//                                 value={shippingDetails.postalCode}
//                                 onChange={handleInputChange}
//                                 required
//                             />
//                         </div>
//                         <input
//                             type="text"
//                             name="phoneNumber"
//                             placeholder={errors.phoneNumber || "Phone Number"}
//                             value={shippingDetails.phoneNumber}
//                             onChange={handleInputChange}
//                             required
//                         />
//                         <button className="proceed-btn" disabled={isSubmitting}>
//                             {isSubmitting ? 'Processing Payment...' : 'Proceed To Payment'}
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default PaymentDetails;

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { placeOrder, verifyPayment } from "../../features/orderSlice";
// import { useNavigate } from "react-router-dom";
// import { fetchCartDetails } from "../../features/cartSlice"; // Ensure you import the correct action
// import "./cartStyle.css";

// const PaymentDetails = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const [shippingDetails, setShippingDetails] = useState({
//         fullName: "",
//         streetAddress: "",
//         city: "",
//         state: "",
//         postalCode: "",
//         phoneNumber: "",
//         country: 'INDIA'
//     });

//     const [errors, setErrors] = useState({});
//     const [isSubmitting, setIsSubmitting] = useState(false);  // To handle the payment submission

//     // Fetch cart state from Redux store
//     const { cart, loading, error } = useSelector((state) => state.cart);

//     useEffect(() => {
//         if (!cart || cart.items?.length === 0) {
//             dispatch(fetchCartDetails())
//                 .unwrap()
//                 .then((data) => {
//                     console.log('Cart fetched successfully:', data);
//                 })
//                 .catch((error) => {
//                     console.error('Error fetching cart:', error);
//                 });
//         }
//     }, [dispatch, cart]);

//     const securedPackagingFee = 39;
//     const finalAmount = cart?.totalPrice + securedPackagingFee;

//     // Validate shipping details
//     const validateForm = () => {
//         let formErrors = {};
//         Object.keys(shippingDetails).forEach((key) => {
//             if (!shippingDetails[key]) {
//                 formErrors[key] = `Please enter ${key.replace(/([A-Z])/g, " $1").toLowerCase()}`;
//             }
//         });
//         setErrors(formErrors);
//         return Object.keys(formErrors).length === 0; // Return true if no errors
//     };

//     // Handle form submission
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (validateForm()) {
//             setIsSubmitting(true);
//             const orderData = {
//                 shippingAddress: {
//                     address: `${shippingDetails.streetAddress}, ${shippingDetails.city}, ${shippingDetails.state}, ${shippingDetails.postalCode}`,
//                     phoneNumber: shippingDetails.phoneNumber,
//                     country: shippingDetails.country,
//                     fullName: shippingDetails.fullName,
//                     city: shippingDetails.city,          // Ensure city is included
//                     postalCode: shippingDetails.postalCode, // Ensure postalCode is included

//                 },
//                 orderedItems: cart?.items || [],
//                 totalAmount: finalAmount,
//                 paymentMethod: 'razorpay',
//                 status: 'placed', // Ensure the status is a valid one
//             };

//             dispatch(placeOrder(orderData))
//                 .unwrap()
//                 .then((response) => {
//                     if (response.razorpayOrderId) {
//                         openRazorpayPayment(response.razorpayOrderId, finalAmount);
//                     }
//                 })
//                 .catch((error) => {
//                     console.error('Error creating order:', error);
//                     setIsSubmitting(false);
//                 });
//         }
//     };

//     // Handle Razorpay payment
//     const openRazorpayPayment = (razorpayOrderId, amount) => {
//         const options = {
//             key: 'rzp_test_YdzmqgNJTf3JpC', // Replace with your Razorpay key
//             amount: amount,
//             currency: 'INR',
//             name: 'Your Store Name',
//             description: 'Test Transaction',
//             order_id: razorpayOrderId,
//             handler: function (response) {
//                 const paymentData = {
//                     paymentId: response.razorpay_payment_id,
//                     orderId: razorpayOrderId,
//                 };
//                 dispatch(verifyPayment(paymentData))
//                     .unwrap()
//                     .then(() => {
//                         navigate('/order-summary'); // Navigate to order summary on success
//                     })
//                     .catch((error) => {
//                         console.error('Payment verification failed:', error);
//                     });
//             },
//             prefill: {
//                 name: shippingDetails.fullName,
//                 email: '',
//                 contact: shippingDetails.phoneNumber,
//             },
//             theme: {
//                 color: '#F37254', // Customize theme color
//             },
//         };

//         const razorpay = new window.Razorpay(options);
//         razorpay.open();
//     };

//     // Handle input change for shipping details
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setShippingDetails({
//             ...shippingDetails,
//             [name]: value,
//         });
//     };

//     // Show loading state or error state if cart is being fetched
//     if (loading) {
//         return <div>Loading cart details...</div>;
//     }

//     return (
//         <>
//             <div className="price-details">
//                 <h2>Price Details</h2>
//                 <div className="price-item">
//                     <span>Price ({cart?.items?.length} items)</span>
//                     <span>₹{Math.floor(cart?.totalPrice)}</span>
//                 </div>
//                 <div className="price-item">
//                     <span>Delivery Charges</span>
//                     <h4>Free</h4>
//                 </div>
//                 <div className="price-item">
//                     <span>Secured Packaging Fee</span>
//                     <span>₹{securedPackagingFee}</span>
//                 </div>
//                 <hr />
//                 <div className="price-item total">
//                     <span>Total Amount</span>
//                     <span>₹{Math.floor(finalAmount)}</span>
//                 </div>
//             </div>

//             <div className="shippingDetails">
//                 <h2>Shipping Details</h2>
//                 <div className="address">
//                     <form onSubmit={handleSubmit}>
//                         <input
//                             type="text"
//                             name="fullName"
//                             placeholder={errors.fullName || "Full Name"}
//                             value={shippingDetails.fullName}
//                             onChange={handleInputChange}
//                             required
//                         />
//                         <input
//                             type="text"
//                             name="streetAddress"
//                             placeholder={errors.streetAddress || "Street Address"}
//                             value={shippingDetails.streetAddress}
//                             onChange={handleInputChange}
//                             required
//                         />
//                         <input
//                             type="text"
//                             name="city"
//                             placeholder={errors.city || "City"}
//                             value={shippingDetails.city}
//                             onChange={handleInputChange}
//                             required
//                         />
//                         <div className="statePin">
//                             <input
//                                 type="text"
//                                 name="state"
//                                 placeholder={errors.state || "State"}
//                                 value={shippingDetails.state}
//                                 onChange={handleInputChange}
//                                 required
//                             />
//                             <input
//                                 type="text"
//                                 name="postalCode"
//                                 placeholder={errors.postalCode || "Postal Code"}
//                                 value={shippingDetails.postalCode}
//                                 onChange={handleInputChange}
//                                 required
//                             />
//                         </div>
//                         <input
//                             type="text"
//                             name="phoneNumber"
//                             placeholder={errors.phoneNumber || "Phone Number"}
//                             value={shippingDetails.phoneNumber}
//                             onChange={handleInputChange}
//                             required
//                         />
//                         <button className="proceed-btn" disabled={isSubmitting}>
//                             {isSubmitting ? 'Processing Payment...' : 'Proceed To Payment'}
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default PaymentDetails;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder, verifyPayment } from "../../features/orderSlice";
import { useNavigate } from "react-router-dom";
import { fetchCartDetails } from "../../features/cartSlice"; // Ensure you import the correct action
import "./cartStyle.css";
import { toast, ToastContainer, Slide } from "react-toastify";

const PaymentDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [shippingDetails, setShippingDetails] = useState({
        fullName: "",
        streetAddress: "",
        city: "",
        state: "",
        postalCode: "",
        phoneNumber: "",
        country: "INDIA",
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false); // To handle the payment submission
    const [paymentError, setPaymentError] = useState(null); // To handle payment verification errors

    // Fetch cart state from Redux store
    const { cart, loading, error } = useSelector((state) => state.cart);

    useEffect(() => {
        if (!cart || cart.items?.length === 0) {
            dispatch(fetchCartDetails())
                .unwrap()
                .then((data) => {
                    console.log("Cart fetched successfully:", data);
                })
                .catch((error) => {
                    console.error("Error fetching cart:", error);
                });
        }
    }, [dispatch, cart]);

    const securedPackagingFee = 39;
    const finalAmount = cart?.totalPrice + securedPackagingFee;

    // Validate shipping details
    const validateForm = () => {
        let formErrors = {};
        Object.keys(shippingDetails).forEach((key) => {
            if (!shippingDetails[key]) {
                formErrors[key] = `Please enter ${key.replace(/([A-Z])/g, " $1").toLowerCase()}`;
            }
        });
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0; // Return true if no errors
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            setIsSubmitting(true);
            const orderData = {
                shippingAddress: {
                    address: `${shippingDetails.streetAddress}, ${shippingDetails.city}, ${shippingDetails.state}, ${shippingDetails.postalCode}`,
                    phoneNumber: shippingDetails.phoneNumber,
                    country: shippingDetails.country,
                    fullName: shippingDetails.fullName,
                    city: shippingDetails.city,
                    postalCode: shippingDetails.postalCode,
                },
                orderedItems: cart?.items || [],
                totalAmount: finalAmount,
                paymentMethod: "razorpay",
            };

            dispatch(placeOrder(orderData))
                .unwrap()
                .then((response) => {
                    if (response.razorpayOrderId) {
                        console.log(response.razorpayOrderId);

                        openRazorpayPayment(response.razorpayOrderId, finalAmount);
                    }
                })
                .catch((error) => {
                    console.error("Error creating order:", error);
                    setIsSubmitting(false);
                });
        }
    };

    // Handle Razorpay payment
    const openRazorpayPayment = (razorpayOrderId, amount) => {
        console.log(amount);

        const options = {
            key: "rzp_test_YdzmqgNJTf3JpC",
            amount: amount,
            currency: "INR",
            name: "Petzi Pet Food",
            description: "Product Payment",
            order_id: razorpayOrderId,
            handler: function (response) {
                const paymentData = {
                    paymentId: response.razorpay_payment_id,
                    orderId: razorpayOrderId,
                };
                dispatch(verifyPayment(paymentData))
                    .unwrap()
                    .then(() => {
                        navigate("/");
                    })
                    .catch((error) => {
                        console.error("Payment verification failed:", error);
                        toast.error(error.message);
                        setPaymentError("Payment verification failed, please try again.");
                        setIsSubmitting(false); // Reset the submitting state
                    });
            },
            prefill: {
                name: shippingDetails.fullName,
                email: "",
                contact: shippingDetails.phoneNumber,
            },
            theme: {
                color: "#F37254", // Customize theme color
            },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
    };

    // Handle input change for shipping details
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setShippingDetails({
            ...shippingDetails,
            [name]: value,
        });
    };

    // Show loading state or error state if cart is being fetched
    if (loading) {
        return <div>Loading cart details...</div>;
    }

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={320}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover
                transition={Slide}
                limit={1}
            />
            <div className="price-details">
                <h2>Price Details</h2>
                <div className="price-item">
                    <span>Price ({cart?.items?.length} items)</span>
                    <span>₹{Math.floor(cart?.totalPrice)}</span>
                </div>
                <div className="price-item">
                    <span>Delivery Charges</span>
                    <h4>Free</h4>
                </div>
                <div className="price-item">
                    <span>Secured Packaging Fee</span>
                    <span>₹{securedPackagingFee}</span>
                </div>
                <hr />
                <div className="price-item total">
                    <span>Total Amount</span>
                    <span>₹{Math.floor(finalAmount)}</span>
                </div>
            </div>

            <div className="shippingDetails">
                <h2>Shipping Details</h2>
                <div className="address">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="fullName"
                            placeholder={errors.fullName || "Full Name"}
                            value={shippingDetails.fullName}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="text"
                            name="streetAddress"
                            placeholder={errors.streetAddress || "Street Address"}
                            value={shippingDetails.streetAddress}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="text"
                            name="city"
                            placeholder={errors.city || "City"}
                            value={shippingDetails.city}
                            onChange={handleInputChange}
                            required
                        />
                        <div className="statePin">
                            <input
                                type="text"
                                name="state"
                                placeholder={errors.state || "State"}
                                value={shippingDetails.state}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="text"
                                name="postalCode"
                                placeholder={errors.postalCode || "Postal Code"}
                                value={shippingDetails.postalCode}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <input
                            type="text"
                            name="phoneNumber"
                            placeholder={errors.phoneNumber || "Phone Number"}
                            value={shippingDetails.phoneNumber}
                            onChange={handleInputChange}
                            required
                        />
                        <button className="proceed-btn" disabled={isSubmitting}>
                            {isSubmitting ? "Processing Payment..." : "Proceed To Payment"}
                        </button>
                        {paymentError && <div className="error-message">{paymentError}</div>}
                    </form>
                </div>
            </div>
        </>
    );
};

export default PaymentDetails;
