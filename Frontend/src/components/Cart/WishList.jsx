// import React, { useContext } from "react";
// import { MdDeleteForever } from "react-icons/md";
// import { ProductContext } from "../../Context/ProductContext";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, Slide } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

// const Wishlist = () => {
//     const { wishList, removeFromWishlist, clearWishlist, addToCart } = useContext(ProductContext);
//     const navigate = useNavigate()


//     return (
//         <div className="wishlist-container">
//                                     <ToastContainer
//                 position="top-center"
//                 autoClose={1300}
//                 hideProgressBar={false}
//                 newestOnTop={false}
//                 closeOnClick
//                 draggable
//                 pauseOnHover
//                 transition={Slide}
//             />
//             <div className="wishlist-header">
//                 <h2>Wishlist</h2>
//                 <div className="wishListBtnsWrap">
//                     <button className="backButton homebtn" onClick={() => navigate("/")}><i className='bx bx-home'></i></button>
//                     <button className="clear-btn" onClick={clearWishlist}>
//                         Clear
//                     </button>
//                 </div>
//             </div>
//             {wishList.length === 0 ? (
//                 <p className="empty-wishlist">Your wishlist is empty.</p>
//             ) : (
//                 <div className="wishlist-items">
//                     {wishList.map((item) => (
//                         <div className="wishlist-card" key={item.id}>
//                             <img className="wishlist-image" src={item.image} alt={item.name} />
//                             <div className="wishlist-info">
//                                 <h3>{item.name}</h3>
//                                 <p className="wishlist-price">₹{item.price}</p>
//                                 <div className="cart-actions">
//                                     <div onClick={()=>(removeFromWishlist(item.id))} className="del">
//                                         <div>
//                                             <MdDeleteForever />
//                                         </div>
//                                     </div>
//                                     <button onClick={()=>{addToCart(item)}} className="addtoCartbtnInWishlist">Add to Cart</button>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Wishlist;




import React, { useEffect } from "react";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getUserWishlist,
  removeProductFromWishlist,
  addProductToWishlist,
  clearUserWishlist,
} from "../../features/wishlistSlice"; // Import actions
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

const Wishlist = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Access wishlist state from Redux store
    const { wishlist, loading, error } = useSelector((state) => state.wishlist);

    // Fetch user wishlist on component mount
    useEffect(() => {
        dispatch(getUserWishlist());
    }, [dispatch]);

    // Handle remove product from wishlist
    const handleRemoveFromWishlist = (productId) => {
        dispatch(removeProductFromWishlist(productId))
            .then(() => {
                // After deletion, check if wishlist is empty
                if (wishlist.length === 1) {
                    // Trigger the wish list re-fetch or clear it directly
                    dispatch(getUserWishlist());
                }
            })
    };

    // Handle add product to cart (this part depends on your cart functionality)
    const handleAddToCart = (item) => {
        dispatch(addProductToWishlist(item.productId)); // You can modify this logic based on how you handle cart
    };

    // Handle clear wishlist
    const handleClearWishlist = () => {
        dispatch(clearUserWishlist());
    };

    return (
        <div className="wishlist-container">
            <ToastContainer
                position="top-center"
                autoClose={1300}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                draggable
                pauseOnHover
                transition={Slide}
                limit={1}
            />
            <div className="wishlist-header">
                <h2>Wishlist</h2>
                <div className="wishListBtnsWrap">
                    <button className="backButton homebtn" onClick={() => navigate("/")}>
                        <i className="bx bx-home"></i>
                    </button>
                    <button className="clear-btn" onClick={handleClearWishlist}>
                        Clear
                    </button>
                </div>
            </div>

            {loading ? (
                <p>Loading...</p> // Display loading state while fetching wishlist
            ) : error ? (
                <p>{error}</p> // Show error message if there's an error fetching the wishlist
            ) : wishlist?.length === 0 ? (
                <p className="empty-wishlist">Your wishlist is empty.</p>
            ) : (
                <div className="wishlist-items">
                    {wishlist?.map((item) => (
                        <div className="wishlist-card" key={item.productId._id}>
                            <img className="wishlist-image" src={item.productId.image} alt={item.productId.name} />
                            <div className="wishlist-info">
                                <h3>{item.productId.name}</h3>
                                <p className="wishlist-price">₹{item.productId.price}</p>
                                <div className="cart-actions">
                                    <div
                                        onClick={() => handleRemoveFromWishlist(item.productId._id)}
                                        className="del"
                                    >
                                        <div>
                                            <MdDeleteForever />
                                        </div>
                                    </div>
                                    <button onClick={() => handleAddToCart(item)} className="addtoCartbtnInWishlist">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;
