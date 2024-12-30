// import React, { useContext } from "react";
// import { ProductContext } from "../../Context/ProductContext";
// import PaymentDetails from "./PaymentDetails";
// import { MdDeleteForever } from "react-icons/md";
// import "./cartStyle.css";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, Slide } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css"; // Import toast styles

// const Cart = () => {
//     const { cart, removeFromCart, updateQuantity } = useContext(ProductContext);
//     const navigate = useNavigate();

//     return (
//         <div className="cart-price">
//             <ToastContainer
//                 position="top-center"
//                 autoClose={1000}
//                 hideProgressBar={false}
//                 newestOnTop={false}
//                 closeOnClick
//                 rtl={false}
//                 pauseOnFocusLoss
//                 draggable
//                 pauseOnHover
//                 transition={Slide}
//             />

//             <h1>
//                 Your <span className="carthead">Cart</span>
//             </h1>
//             <div className="homebtn">
//                 <button className="back-button" onClick={() => navigate("/")}>
//                     <i className="bx bx-home"></i>
//                 </button>
//             </div>
//             <div className="cart-container">
//                 {cart.length === 0 ? ( //if nothing is added to the cart, it shows empty
//                     <h3>Your cart is empty.</h3>
//                 ) : (
//                     <div className="cart-content">
//                         <div className="cart-items">
//                             {cart.map((product) => (
//                                 <div className="cart-item" key={product.id}>
//                                     <img src={product.image} alt={product.name} />
//                                     <div className="cart-details">
//                                         <h4>{product.name}</h4>
//                                         <h5>Seller: {product.seller}</h5>
//                                         <p>
//                                             <span className="original-price">₹{product.oldPrice}</span>
//                                             <span className="discounted-price"> ₹{product.price}</span>
//                                         </p>
//                                         <div className="quantity-controls">
//                                             <button onClick={() => updateQuantity(product.id, product.quantity - 1)}>
//                                                 -
//                                             </button>
//                                             <span>{product.quantity}</span>
//                                             <button onClick={() => updateQuantity(product.id, product.quantity + 1)}>
//                                                 +
//                                             </button>
//                                         </div>
//                                         <div className="cart-actions">
//                                             <div onClick={() => removeFromCart(product.id)} className="del">
//                                                 <div>
//                                                     <MdDeleteForever />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="delivery-info">
//                                         <p>
//                                             Delivery by {product.deliveryDate} | <span>Free</span>
//                                         </p>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                         <div className="price-details">
//                             {/* both payment details and cart are in same component */}
//                             <PaymentDetails />
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Cart;


import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartDetails, removeProductFromCart, updateCartQuantity } from "../../features/cartSlice";
import PaymentDetails from "./PaymentDetails";
import { MdDeleteForever } from "react-icons/md";
import "./cartStyle.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Fetch cart data from Redux store
    const { cart } = useSelector(state => state.cart);

    // Effect to fetch cart details when component mounts
    useEffect(() => {
        dispatch(fetchCartDetails());
    }, [dispatch]);

    // Handle remove product from cart
    const handleRemove = async(productId) => {
        await dispatch(removeProductFromCart(productId))
        .unwrap()
        .then((response) => {
            toast.success(response.message); 
            dispatch(fetchCartDetails());
        })
    };

    const handleQuantityChange = (productId, action) => {
        dispatch(updateCartQuantity({ productId, action }))
            .unwrap()
            .then((response) => {                
                    toast.success(response.message);
                    dispatch(fetchCartDetails());
            }).catch((error) => {
                toast.error(error)
            })
    };
    

    return (
        <div className="cart-price">
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

            <h1>
                Your <span className="carthead">Cart</span>
            </h1>
            <div className="homebtn">
                <button className="back-button" onClick={() => navigate("/")}>
                    <i className="bx bx-home"></i>
                </button>
            </div>
            <div className="cart-container">
                {/* Check if cart.items is empty */}
                {cart?.items?.length === 0 ? (
                    <h3>Your cart is empty</h3>
                ) : (
                    <div className="cart-content">
                        <div className="cart-items">
                            {/* Map through cart.items */}
                            {cart?.items?.map((item) => (
                                <div className="cart-item" key={item._id}>
                                    <img src={item.productId.image} alt={item.productId.name} />
                                    <div className="cart-details">
                                        <h4>{item.productId.name}</h4>
                                        <h5>Seller: {item.productId.seller}</h5>
                                        <p>
                                            <span className="original-price">₹{item.productId.oldPrice}</span>
                                            <span className="discounted-price"> ₹{item.productId.price}</span>
                                        </p>
                                        <div className="quantity-controls">
                                            <button 
                                                onClick={() => handleQuantityChange(item.productId._id, "decrease")}
                                                disabled={item.quantity === 1}
                                                aria-label="Decrease quantity"
                                            >
                                                -
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button 
                                                onClick={() => handleQuantityChange(item.productId._id, "increase")}
                                                aria-label="Increase quantity"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <div className="cart-actions">
                                            <div onClick={() => handleRemove(item.productId._id)} className="del">
                                                <div>
                                                    <MdDeleteForever />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="delivery-info">
                                        <p>
                                            Delivery by {item.productId.deliveryDate} | <span>Free</span>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="price-details">
                            {/* Both payment details and cart are in the same component */}
                            <PaymentDetails />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
