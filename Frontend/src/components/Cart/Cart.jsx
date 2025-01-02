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
    const { cart } = useSelector(state => state.cart);
    const { isAuthenticated } = useSelector(state => state.auth);

    useEffect(() => {
        if(!isAuthenticated){
            navigate('/login')
        }else{
            dispatch(fetchCartDetails());
        }
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
                {cart?.items?.length === 0 ? (
                    <h3>Your cart is empty</h3>
                ) : (
                    <div className="cart-content">
                        <div className="cart-items">
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
                            <PaymentDetails />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
