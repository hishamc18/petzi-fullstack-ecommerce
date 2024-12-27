// import React, { useContext, forwardRef, useState } from "react";
// import { ProductContext } from "../../Context/ProductContext";
// import { MdOutlineFavoriteBorder } from "react-icons/md";
// import ProductInfoModal from "./ProductInfoModal";
// import "./homeStyle.css";

// const Products = forwardRef((_, ref) => {
//     const { addToCart, filteredProducts, isLoggedIn, addToWishlist, setToastMessage } = useContext(ProductContext);
//     const [selectedProduct, setSelectedProduct] = useState(null); // State to manage selected product

//     const handleAddToCartClick = (product) => {
//         if (!isLoggedIn) {
//             setToastMessage("Please log in to add items to your cart");
//         } else {
//             addToCart(product);
//         }
//     };

//     const handleImageClick = (product) => {
//         setSelectedProduct(product); // Set the clicked product to state
//     };

//     const closeModal = () => {
//         setSelectedProduct(null); // Close the modal
//     };

//     return (
//         <div className="products-container" ref={ref}>
//             {filteredProducts.length === 0 ? (
//                 <p className="productError">No products found...😞</p>
//             ) : (
//                 filteredProducts.slice().reverse().map((product) => (
//                     <div className="card" key={product.id}>
//                         <div className="wrapper">
//                             <div className="card-image" onClick={() => handleImageClick(product)}>
//                                 <img src={product.image} alt={product.name} />
//                             </div>
//                             <div className="content">
//                                 <p className="title">{product.name}</p>
//                                 <div className="prices">
//                                     <p className="title price">₹{product.price}</p>
//                                     {product.oldPrice && <p className="title price old-price">₹{product.oldPrice}</p>}
//                                 </div>
//                             </div>
//                             <div className="wrapCardButtons">
//                                 <button className="card-btn" onClick={() => handleAddToCartClick(product)}>
//                                     <i className="bx bx-cart"></i> Add to Cart
//                                 </button>
//                                 <button className="card-btn2" onClick={() => addToWishlist(product)}>
//                                     <MdOutlineFavoriteBorder className="wishIcon" />
//                                 </button>
//                             </div>
//                         </div>
//                         <p className="tag">-50%</p>
//                     </div>
//                 ))
//             )}
//             {selectedProduct && (
//                 <ProductInfoModal product={selectedProduct} onClose={closeModal} />
//             )}
//         </div>
//     );
// });

// export default Products;







import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import ProductInfoModal from "./ProductInfoModal";
import { fetchProducts } from "../../features/productSlice";
// import { addToCart } from "../../features/cartSlice";
// import { addToWishlist } from "../../features/wishlistSlice";
import "./homeStyle.css";

const Products = React.forwardRef((props, ref) => {
    const dispatch = useDispatch();
    const { products, loading, currentPage, hasMore } = useSelector((state) => state.products);
    const { isLoggedIn } = useSelector((state) => state.auth);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [ toastMessage, setToastMessage ] = useState("");
    
        useEffect(() => {
            if (toastMessage) {
                const timer = setTimeout(() => {
                    setToastMessage("");
                }, 2200);
                return () => clearTimeout(timer); // Cleanup timeout on unmount
            }
        }, [toastMessage]);

    const handleAddToCartClick = (product) => {
        if (!isLoggedIn) {
        setToastMessage("Please log in to add items to your cart");
        } else {
            dispatch(addToCart(product));
        }
    };

    const handleAddToWishlistClick = (product) => {
        if (!isLoggedIn) {
            setToastMessage("Please log in to add items to your wishlist");
        } else {
            dispatch(addToWishlist(product));
        }
    };

    const handleImageClick = (product) => {
        setSelectedProduct(product);
    };

    const closeModal = () => {
        setSelectedProduct(null); // Close the modal
    };

    useEffect(() => {
        if (!loading && hasMore) {
            dispatch(fetchProducts({ page: currentPage, limit: 12 }));
        }
    }, [dispatch, currentPage, hasMore]);

    const handlePrevious = () => {
        if (currentPage > 1) {
            dispatch(fetchProducts({ page: currentPage - 1, limit: 12 }));
        }
    };
    
    const handleNext = () => {
        if (hasMore && !loading) {
            dispatch(fetchProducts({ page: currentPage + 1, limit: 12 }));
        }
    };
    return (
        <div>
            <div className="products-container" ref={ref}>
                {products.length === 0 && !loading && <p className="productError">No products found...😞</p>}
                {products.map((product) => (
                    <div className="card" key={product._id}>
                        <div className="wrapper">
                            <div className="card-image" onClick={() => handleImageClick(product)}>
                                <img src={product.image} alt={product.name} />
                            </div>
                            <div className="content">
                                <p className="title">{product.name}</p>
                                <div className="prices">
                                    <p className="title price">₹{product.price}</p>
                                    {product.oldPrice && <p className="title price old-price">₹{product.oldPrice}</p>}
                                </div>
                            </div>
                            <div className="wrapCardButtons">
                                <button className="card-btn" onClick={() => handleAddToCartClick(product)}>
                                    <i className="bx bx-cart"></i> Add to Cart
                                </button>
                                <button className="card-btn2" onClick={() => handleAddToWishlistClick(product)}>
                                    <MdOutlineFavoriteBorder className="wishIcon" />
                                </button>
                            </div>
                        </div>
                        <p className="tag">-50%</p>
                    </div>
                ))}

                {selectedProduct && (
                    <ProductInfoModal productId={selectedProduct._id} onClose={closeModal} />
                    
                )}
                {loading && <p>Loading Products</p>}
            </div>
                        <div className="pagination-controls">
                        <button
                            onClick={handlePrevious}
                            disabled={currentPage === 1 || loading}
                            className="pagination-btn"
                        >
                            Previous
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={!hasMore || loading}
                            className="pagination-btn"
                        >
                            Next
                        </button>
                    </div>
        </div>
        
    );
});

export default Products;

