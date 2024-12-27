// import React, { useState, useContext, useRef, useEffect } from "react";
// import "./homeStyle.css";
// import { ProductContext } from "../../Context/ProductContext";
// import { useNavigate } from "react-router-dom";
// import { TbTruckDelivery } from "react-icons/tb";
// import { MdOutlineFavoriteBorder } from "react-icons/md";
// import { MdOutlinePets } from "react-icons/md";

// const Navbar = ({ scrollToProducts }) => {
//     const {
//         setSearchTerm,
//         products,
//         cart,
//         isLoggedIn,
//         currentUser,
//         toastMessage,
//         setToastMessage,
//         handleLogoutClick,
//         setCategory,
//         username
//     } = useContext(ProductContext);
//     const [suggestions, setSuggestions] = useState([]); //for using the search suggestion
//     const [dropdownOpen, setDropdownOpen] = useState(false); // for dropdown button in profile for logout and orders
//     const navigate = useNavigate();
//     const dropdownRef = useRef(null);


//     console.log(username);
    
//     //access entry to cart only when the user is loged.
//     const handleCartAccess = () => {
//         if (!isLoggedIn) {
//             // alert("Please log in to access your cart.");
//             setToastMessage("Please Login to Access Your Cart.");
//         } else {
//             navigate("/cart");
//             setSearchTerm("");
//         }
//     };

//     //when clicking profile, navigate to login page if user not loged else show option for logout
//     const handleProfileClick = () => {
//         if (!isLoggedIn) {
//             navigate("/login");
//         } else {
//             toggleDropdown();
//         }
//     };

//     const handleOrderAccess = () => {
//         if (!isLoggedIn) {
//             setToastMessage("Please Login to Access Your Cart Orders.");
//         } else {
//             navigate("/orders");
//         }
//     };

//     const handlePetFoods = () => {
//         setSearchTerm("");
//         setCategory("");
//         scrollToProducts();
//     };

//     const handleSearch = (e) => {
//         const searchValue = e.target.value.toLowerCase();
//         setSearchTerm(searchValue);

//         if (searchValue.length > 0) {
//             const filteredSuggestions = products.filter(
//                 (product) =>
//                     product.name.toLowerCase().includes(searchValue) || product.category.toLowerCase().includes(searchValue) // Search by both product name and category
//             );
//             setSuggestions(filteredSuggestions);
//         } else {
//             setSuggestions([]);
//         }
//     };

//     //for clicking the searched product from the suggestion list
//     const handleSuggestionClick = (suggestion) => {
//         setSearchTerm(suggestion.name.toLowerCase());
//         setSuggestions([]); // used to remove suggestion list, once a product is cliciked
//     };

//     // suggestions close when searchbar out of focus
//     const handleBlur = () => {
//         setSuggestions([]);
//     };

//     // for toggle conditon to active the dropdown only when user is logined.
//     const toggleDropdown = () => {
//         setDropdownOpen(!dropdownOpen);
//     };

//     //for handling the dropdown btns goes when user click outside
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//                 setDropdownOpen(false); // Close dropdown if clicked outside
//             }
//         };
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, [dropdownRef]);

//     //refresh when logo clicks
//     const refresh = () => {
//         window.location.reload();
//     };

//     return (
//         <nav className="navbar">
//             <div onClick={refresh} className="navbar-logo">
//                 <img src="src/assets/logo/logo1.png" alt="logo" />
//             </div>
//             {toastMessage && <div className="toast">{toastMessage}</div>}
//             <div className="navbar-icons">
//                 <div className="navbar-icon orders petFood" onClick={handlePetFoods}>
//                     <MdOutlinePets />
//                     <label>Pet Foods</label>
//                 </div>
//                 <div onClick={handleOrderAccess} className="navbar-iconCart orders orders1">
//                     <TbTruckDelivery className="orderIcon" />
//                     <label>Orders</label>
//                 </div>
//                 {/* Cart icon */}
//                 <div className="navbar-iconCart" onClick={handleCartAccess}>
//                     <div className="cartlogoname">
//                         <i className="bx bx-cart"></i>
//                         <label>Cart</label>
//                     </div>
//                     <div className="count">{cart.length > 0 && <span className="cart-badge">{cart.length}</span>}</div>
//                 </div>
//                 {/* Profile icon */}
//                 <div className="navbar-icon" onClick={handleProfileClick} ref={dropdownRef}>
//                     <i className="bx bx-user"></i>
//                     <label> {isLoggedIn ? username : "Login"} </label>
                    
//                     {dropdownOpen && isLoggedIn && (
//                         <div className="dropdown-menu">
//                             <div className="wrapDropDownIcons">
//                                 <button className="logout" onClick={handleLogoutClick}>
//                                     <i className="bx bx-log-out"></i>
//                                     <span className="logoutText">Logout</span>
//                                 </button>
//                                 <button
//                                     className="logout-button"
//                                     onClick={() => {
//                                         navigate("/wishlist");
//                                     }}
//                                 >
//                                     <MdOutlineFavoriteBorder className="wishIcon" />
//                                     <span className="wishListText">Wishlist</span>
//                                 </button>
//                             </div>
//                             <div
//                                 onClick={() => {
//                                     navigate("orders");
//                                 }}
//                                 className="navbar-iconCart orders"
//                             >
//                                 <TbTruckDelivery className="orderIcon" />
//                                 <label>Orders</label>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//             <div className="navbar-search">
//                 <input type="text" onBlur={handleBlur} placeholder="Search for products..." onChange={handleSearch}></input>
//                 <div className="searchIcon">
//                     <i className="bx bx-search-alt-2"></i>
//                 </div>
//                 {suggestions.length > 0 && (
//                     <ul className="suggestions-list">
//                         {suggestions.map((suggestion) => (
//                             <li key={suggestion.id} onClick={() => handleSuggestionClick(suggestion)}>
//                                 {suggestion.name}
//                             </li>
//                         ))}
//                     </ul>
//                 )}
//             </div>
//         </nav>
//     );
// };

// export default Navbar;




// import React, { useState, useContext, useRef, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { TbTruckDelivery } from "react-icons/tb";
// import { MdOutlineFavoriteBorder, MdOutlinePets } from "react-icons/md";
// // import { setToastMessage } from "../../Redux/productSlice"; // Assuming toastMessage action is in productSlice
// import { logout } from "../../features/authSlice"; // Assuming logout action in authSlice

// const Navbar = ({ scrollToProducts }) => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const dropdownRef = useRef(null);

//     // Accessing data from Redux store
//     const { products, cart } = useSelector((state) => state.products);
//     const { isLoggedIn, username } = useSelector((state) => state.auth);
//     const [suggestions, setSuggestions] = useState([]); // For search suggestions
//     const [dropdownOpen, setDropdownOpen] = useState(false); // For dropdown button in profile

//     // Handle cart access only if logged in
//     const handleCartAccess = () => {
//         if (!isLoggedIn) {
//             // dispatch(setToastMessage("Please Login to Access Your Cart."));
//         } else {
//             navigate("/cart");
//         }
//     };

//     // Handle profile click: if logged in, show logout options
//     const handleProfileClick = () => {
//         if (!isLoggedIn) {
//             navigate("/login");
//         } else {
//             toggleDropdown();
//         }
//     };

//     const handleOrderAccess = () => {
//         if (!isLoggedIn) {
//             // dispatch(setToastMessage("Please Login to Access Your Orders."));
//         } else {
//             navigate("/orders");
//         }
//     };

//     const handlePetFoods = () => {
//         setSuggestions([]);
//         scrollToProducts();
//     };

//     const handleSearch = (e) => {
//         const searchValue = e.target.value.toLowerCase();
//         setSuggestions([]);

//         if (searchValue.length > 0) {
//             const filteredSuggestions = products.filter(
//                 (product) =>
//                     product.name.toLowerCase().includes(searchValue) ||
//                     product.category.toLowerCase().includes(searchValue)
//             );
//             setSuggestions(filteredSuggestions);
//         }
//     };

//     const handleSuggestionClick = (suggestion) => {
//         setSuggestions([]);
//         navigate(`/product/${suggestion.id}`);
//     };

//     const handleBlur = () => {
//         setSuggestions([]);
//     };

//     const toggleDropdown = () => {
//         setDropdownOpen(!dropdownOpen);
//     };

//     // Close dropdown if clicked outside
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//                 setDropdownOpen(false);
//             }
//         };
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, []);

//     // Refresh the page when logo clicked
//     const refresh = () => {
//         window.location.reload();
//     };

//     // Logout user and clear session (Clear cookies and Redux state)
//     const handleLogout = () => {
//         dispatch(logout()); // Clear user data from Redux store
//         document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT"; // Expire the token cookie
//         document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT"; // Expire the refreshToken cookie
//         navigate("/login"); // Redirect to login page
//     };

//     return (
//         <nav className="navbar">
//             <div onClick={refresh} className="navbar-logo">
//                 <img src="src/assets/logo/logo1.png" alt="logo" />
//             </div>
//             {toastMessage && <div className="toast">{toastMessage}</div>}
//             <div className="navbar-icons">
//                 <div className="navbar-icon orders petFood" onClick={handlePetFoods}>
//                     <MdOutlinePets />
//                     <label>Pet Foods</label>
//                 </div>
//                 <div onClick={handleOrderAccess} className="navbar-iconCart orders orders1">
//                     <TbTruckDelivery className="orderIcon" />
//                     <label>Orders</label>
//                 </div>
//                 <div className="navbar-iconCart" onClick={handleCartAccess}>
//                     <div className="cartlogoname">
//                         <i className="bx bx-cart"></i>
//                         <label>Cart</label>
//                     </div>
//                     <div className="count">{cart.length > 0 && <span className="cart-badge">{cart.length}</span>}</div>
//                 </div>
//                 <div className="navbar-icon" onClick={handleProfileClick} ref={dropdownRef}>
//                     <i className="bx bx-user"></i>
//                     <label>{isLoggedIn ? username : "Login"}</label>

//                     {dropdownOpen && isLoggedIn && (
//                         <div className="dropdown-menu">
//                             <div className="wrapDropDownIcons">
//                                 <button className="logout" onClick={handleLogout}>
//                                     <i className="bx bx-log-out"></i>
//                                     <span className="logoutText">Logout</span>
//                                 </button>
//                                 <button
//                                     className="logout-button"
//                                     onClick={() => {
//                                         navigate("/wishlist");
//                                     }}
//                                 >
//                                     <MdOutlineFavoriteBorder className="wishIcon" />
//                                     <span className="wishListText">Wishlist</span>
//                                 </button>
//                             </div>
//                             <div
//                                 onClick={() => {
//                                     navigate("orders");
//                                 }}
//                                 className="navbar-iconCart orders"
//                             >
//                                 <TbTruckDelivery className="orderIcon" />
//                                 <label>Orders</label>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//             <div className="navbar-search">
//                 <input
//                     type="text"
//                     onBlur={handleBlur}
//                     placeholder="Search for products..."
//                     onChange={handleSearch}
//                 />
//                 <div className="searchIcon">
//                     <i className="bx bx-search-alt-2"></i>
//                 </div>
//                 {suggestions.length > 0 && (
//                     <ul className="suggestions-list">
//                         {suggestions.map((suggestion) => (
//                             <li key={suggestion.id} onClick={() => handleSuggestionClick(suggestion)}>
//                                 {suggestion.name}
//                             </li>
//                         ))}
//                     </ul>
//                 )}
//             </div>
//         </nav>
//     );
// };

// export default Navbar;





import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { MdOutlinePets } from "react-icons/md";
import "./homeStyle.css";
import { logoutUser } from "../../features/authSlice";

const Navbar = ({ scrollToProducts }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, user } = useSelector(state => state.auth);

    const [suggestions, setSuggestions] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [toastMessage, setToastMessage] = useState("");

    const handleCartAccess = () => {
        if (!isAuthenticated) {
            setToastMessage("Please Login to Access Your Cart.");
        } else {
            navigate("/cart");
        }
    };

    const handleProfileClick = () => {
        if (!isAuthenticated) {
            navigate("/login");
        } else {
            toggleDropdown();
        }
    };

    const handleOrderAccess = () => {
        if (!isAuthenticated) {
            setToastMessage("Please Login to Access Your Orders.");
        } else {
            navigate("/orders");
        }
    };

    const handlePetFoods = () => {
        setSearchTerm("");
        setCategory("");
        scrollToProducts();
    };

    const handleSearch = (e) => {
        const searchValue = e.target.value.toLowerCase();
        setSearchTerm(searchValue);

        if (searchValue.length > 0) {
            const filteredSuggestions = products.filter(
                (product) =>
                    product.name.toLowerCase().includes(searchValue) || product.category.toLowerCase().includes(searchValue)
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchTerm(suggestion.name.toLowerCase());
        setSuggestions([]);
    };

    const handleBlur = () => {
        setSuggestions([]);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

//logout
    const handleLogoutClick = () => {
        dispatch(logoutUser())
          .then(() => {
            navigate('/login');
          })
          .catch((error) => {
            console.error('Logout error:', error);
          });
      };
    

    const refresh = () => {
        window.location.reload();
    };

    return (
        <nav className="navbar">
            <div onClick={refresh} className="navbar-logo">
                <img src="src/assets/logo/logo1.png" alt="logo" />
            </div>
            {toastMessage && <div className="toast">{toastMessage}</div>}
            <div className="navbar-icons">
                <div className="navbar-icon orders petFood" onClick={handlePetFoods}>
                    <MdOutlinePets />
                    <label>Pet Foods</label>
                </div>
                <div onClick={handleOrderAccess} className="navbar-iconCart orders orders1">
                    <TbTruckDelivery className="orderIcon" />
                    <label>Orders</label>
                </div>
                <div className="navbar-iconCart" onClick={handleCartAccess}>
                    <div className="cartlogoname">
                        <i className="bx bx-cart"></i>
                        <label>Cart</label>
                    </div>
                    {/* <div className="count">{cart?.length > 0 && <span className="cart-badge">{cart?.length}</span>}</div> */}
                </div>
                <div className="navbar-icon" onClick={handleProfileClick} ref={dropdownRef}>
                    <i className="bx bx-user"></i>
                    <label>{isAuthenticated ? user.username : "Login"}</label>

                    {dropdownOpen && isAuthenticated && (
                        <div className="dropdown-menu">
                            <div className="wrapDropDownIcons">
                                <button className="logout" onClick={handleLogoutClick}>
                                    <i className="bx bx-log-out"></i>
                                    <span className="logoutText">Logout</span>
                                </button>
                                <button
                                    className="logout-button"
                                    onClick={() => {
                                        navigate("/wishlist");
                                    }}
                                >
                                    <MdOutlineFavoriteBorder className="wishIcon" />
                                    <span className="wishListText">Wishlist</span>
                                </button>
                            </div>
                            <div
                                onClick={() => {
                                    navigate("orders");
                                }}
                                className="navbar-iconCart orders"
                            >
                                <TbTruckDelivery className="orderIcon" />
                                <label>Orders</label>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="navbar-search">
                <input type="text" onBlur={handleBlur} placeholder="Search for products..." onChange={handleSearch}></input>
                <div className="searchIcon">
                    <i className="bx bx-search-alt-2"></i>
                </div>
                {suggestions.length > 0 && (
                    <ul className="suggestions-list">
                        {suggestions.map((suggestion) => (
                            <li key={suggestion.id} onClick={() => handleSuggestionClick(suggestion)}>
                                {suggestion.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
