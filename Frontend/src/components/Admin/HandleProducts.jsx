// // import React, { useContext, useEffect, useState } from "react";
// // import { AdminContext } from "../../Context/AdminContext";
// // import Modal from "./Modal";
// // import { toast, ToastContainer } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";
// // import "./admin.css";

// // const HandleProducts = () => {
// //     const { addProduct, deleteProduct, editProduct, products } = useContext(AdminContext);
// //     const [productData, setProductData] = useState({
// //         id: "",
// //         name: "",
// //         price: "",
// //         oldPrice: "",
// //         image: "",
// //         category: "",
// //         seller: "",
// //         stock:''
// //     });
// //     const [viewMode, setViewMode] = useState("table"); //view mode of the products (table/cards)
// //     const [selectedCategory, setSelectedCategory] = useState("all"); // State for selected category
// //     const [isModalOpen, setIsModalOpen] = useState(false); // modal visibility
// //     const [isEditing, setIsEditing] = useState(false); // for eiditing product details

// //     // Calculate product counts
// //     const totalProducts = products.length;
// //     const dogProducts = products.filter((product) => product.category === "dog").length;
// //     const catProducts = products.filter((product) => product.category === "cat").length;

// //     // Filter products by category
// //     const filteredProducts =
// //         selectedCategory === "all" ? products : products.filter((product) => product.category === selectedCategory);

// //     const handleInputChange = (e) => {
// //         const { name, value } = e.target;
// //         setProductData((prevData) => ({ ...prevData, [name]: value }));
// //     };

// //     //to add products
// //     const handleAddProduct = () => {
// //         setIsEditing(false); // Open modal for adding a product
// //         setProductData({
// //             id: "",
// //             name: "",
// //             price: "",
// //             oldPrice: "",
// //             image: "",
// //             category: "",
// //             seller: "",
// //             stock: "",
// //         });
// //         setIsModalOpen(true); // Open the modal
// //     };

// //     //to save the edited details or added productes
// //     const handleSaveProduct = () => {
// //         if (productData.name && productData.price && productData.category && productData.seller) {
// //             if (isEditing) {
// //                 editProduct(productData.id, {
// //                     name: productData.name,
// //                     price: parseFloat(productData.price),
// //                     oldPrice: parseFloat(productData.oldPrice),
// //                     image: productData.image,
// //                     category: productData.category,
// //                     seller: productData.seller,
// //                     stock: parseInt(productData.stock)
// //                 });
// //                 toast.success("Product updated successfully!");
// //             } else {
// //                 const newProduct = {
// //                     id: Date.now().toString(),
// //                     name: productData.name,
// //                     price: parseFloat(productData.price),
// //                     oldPrice: parseFloat(productData.oldPrice) || null,
// //                     image: productData.image,
// //                     category: productData.category,
// //                     seller: productData.seller,
// //                     stock: parseInt(productData.stock)
// //                 };
// //                 addProduct(newProduct);
// //                 toast.success("Product added successfully!");
// //             }
// //             setIsModalOpen(false); // Close modal after saving
// //         } else {
// //             toast.error("Please fill in all required fields.");
// //         }
// //     };

// //     //to delete a product
// //     const handleDeleteProduct = (id) => {
// //         toast(
// //             ({ closeToast }) => (
// //                 <div className="productDeleteConfirm">
// //                     <p>Are you sure you want to delete this product?</p>
// //                     <div>
// //                         <button
// //                             onClick={() => {
// //                                 deleteProduct(id);
// //                                 toast.success("Product deleted successfully!");
// //                                 closeToast();
// //                             }}
// //                             className="deleteconfirmButton"
// //                         >
// //                             Yes
// //                         </button>
// //                         <button onClick={closeToast} className="deletecancelButton">
// //                             No
// //                         </button>
// //                     </div>
// //                 </div>
// //             ),
// //             {
// //                 closeOnClick: false,
// //                 autoClose: false,
// //             }
// //         );
// //     };

// // //to handling edit
// //     const handleEditProduct = (product) => {
// //         setIsEditing(true); // Open modal for editing a product
// //         setProductData({
// //             id: product.id,
// //             name: product.name,
// //             price: product.price,
// //             oldPrice: product.oldPrice,
// //             image: product.image,
// //             category: product.category,
// //             seller: product.seller,
// //             stock: product.stock,
// //         });
// //         setIsModalOpen(true); // Open the modal
// //     };

// //     return (
// //         <div className="handle-products">
// //             <div className="wrapHandleProductHead">
// //                 <h2>Handle Products</h2>
// // <div className="wrapAddBtnandCard">
// // <div className="Admincard">
// //         <div className="Cardcontent">
// //             <h3 className="Cardheading">Product Overview</h3>
// //             <p>
// //                 <strong>Total Products: </strong>
// //                 {totalProducts}
// //             </p>
// //             <p>
// //                 <strong>Cat Products: </strong>
// //                 {catProducts}
// //             </p>
// //             <p>
// //                 <strong>Dog Products: </strong>
// //                 {dogProducts}
// //             </p>
// //         </div>
// //     </div>
// //     <button onClick={handleAddProduct} className="addEditbutton">
// //         <span>Add Product</span>
// //     </button>
// //     <div className="Admincard">
// //         <div className="Cardcontent">
// //             <h4 className="Cardheading">Seller Overview</h4>
// //             <p>
// //                 <strong>Total Sellers: </strong>
// //                 28
// //             </p>
// //             <p>
// //                 <strong>Cat: </strong>
// //                 11
// //             </p>
// //             <p>
// //                 <strong>Dog: </strong>
// //                 17
// //             </p>
// //         </div>
// //     </div>
// // </div>
// //             </div>

// //             {/* Product counts and view modes */}
// //             <div className="view-switch">
// //                 <div className="wrapSelect">
// //                     <div>
// //                         <label>View Mode: </label>
// //                         <select onChange={(e) => setViewMode(e.target.value)} value={viewMode}>
// //                             <option value="table">Table</option>
// //                             <option value="cards">Cards</option>
// //                         </select>
// //                     </div>
// //                     <div>
// //                         <label>Category: </label>
// //                         <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
// //                             <option value="all">All</option>
// //                             <option value="dog">Dog</option>
// //                             <option value="cat">Cat</option>
// //                         </select>
// //                     </div>
// //                 </div>

// //                 <div className="product-counts">
// //                     <span>
// //                         Total Products: <strong>{totalProducts}</strong>
// //                     </span>{" "}
// //                     |{" "}
// //                     <span>
// //                         Dog Products: <strong>{dogProducts}</strong>
// //                     </span>{" "}
// //                     |{" "}
// //                     <span>
// //                         Cat Products: <strong>{catProducts}</strong>
// //                     </span>
// //                 </div>
// //             </div>

// //             {/* Products Table or Cards */}
// //             <div className="productsListing">
// //                 <h2>Current Products</h2>
// //                 {viewMode === "table" ? (
// //                     <table className="product-table">
// //                         <thead>
// //                             <tr>
// //                                 <th>Name</th>
// //                                 <th>Price</th>
// //                                 <th>Old Price</th>
// //                                 <th>Image</th>
// //                                 <th>Category</th>
// //                                 <th>Stock</th>
// //                                 <th>Seller</th>
// //                                 <th>Actions</th>
// //                             </tr>
// //                         </thead>
// //                         <tbody>
// //                             {filteredProducts.slice().reverse().map((product) => (
// //                                 <tr key={product.id}>
// //                                     <td>{product.name}</td>
// //                                     <td>${product.price.toFixed(2)}</td>
// //                                     <td>${product.oldPrice}</td>
// //                                     <td>
// //                                         <img src={product.image} alt={product.name} style={{ width: "50px" }} />
// //                                     </td>
// //                                     <td>{product.category}</td>
// //                                     <td>{product.stock}</td>
// //                                     <td>{product.seller}</td>
// //                                     <td>
// //                                         <div className="productActions">
// //                                             <button onClick={() => handleEditProduct(product)}>Edit</button>
// //                                             <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
// //                                         </div>
// //                                     </td>
// //                                 </tr>
// //                             ))}
// //                         </tbody>
// //                     </table>
// //                 ) : (
// //                     <div className="product-cards">
// //                         {filteredProducts.slice().reverse().map((product) => (
// //                             <div className="product-card" key={product.id}>
// //                                 <img src={product.image} alt={product.name} />
// //                                 <div className="product-details">
// //                                     <h4>{product.name}</h4>
// //                                     <p>
// //                                         <strong>Price:</strong> ${product.price.toFixed(2)}
// //                                     </p>
// //                                     <p>
// //                                         <strong>Old Price:</strong> $
// //                                         {product.oldPrice}
// //                                     </p>
// //                                     <p>
// //                                         <strong>Category:</strong> {product.category}
// //                                     </p>
// //                                     <p>
// //                                         <strong>Stock:</strong> {product.stock}
// //                                     </p>
// //                                     <p>
// //                                         <strong>Seller:</strong> {product.seller}
// //                                     </p>
// //                                     <div className="productActions">
// //                                         <button onClick={() => handleEditProduct(product)}>Edit</button>
// //                                         <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
// //                                     </div>
// //                                 </div>
// //                             </div>
// //                         ))}
// //                     </div>
// //                 )}
// //             </div>

// //             {/* Modal for Adding/Editing Products */}
// //             <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
// //                 <div className="product-form">
// //                     <h3>{isEditing ? "Edit Product" : "Add New Product"}</h3>
// //                     <div className="inputWrap">
// //                         <input
// //                             type="text"
// //                             name="name"
// //                             placeholder="Product Name"
// //                             value={productData.name}
// //                             onChange={handleInputChange}
// //                         />
// //                         <input
// //                             type="number"
// //                             name="price"
// //                             placeholder="Product Price"
// //                             value={productData.price}
// //                             onChange={handleInputChange}
// //                         />
// //                         <input
// //                             type="number"
// //                             name="oldPrice"
// //                             placeholder="Old Price"
// //                             value={productData.oldPrice}
// //                             onChange={handleInputChange}
// //                         />
// //                         <input
// //                             type="text"
// //                             name="image"
// //                             placeholder="Image URL"
// //                             value={productData.image}
// //                             onChange={handleInputChange}
// //                         />
// //                         <input
// //                             type="text"
// //                             name="category"
// //                             placeholder="Category"
// //                             value={productData.category}
// //                             onChange={handleInputChange}
// //                         />
// //                         <input
// //                             type="number"
// //                             name="stock"
// //                             placeholder="Stock"
// //                             value={productData.stock}
// //                             onChange={handleInputChange}
// //                             required
// //                         />
// //                         <input
// //                             type="text"
// //                             name="seller"
// //                             placeholder="Seller"
// //                             value={productData.seller}
// //                             onChange={handleInputChange}
// //                         />
// //                     </div>
// //                     <button className="addEditbutton updateBtn" onClick={handleSaveProduct}>
// //                         {isEditing ? "Update" : "Add "}
// //                     </button>
// //                 </div>
// //             </Modal>
// //             <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={true} />
// //         </div>
// //     );
// // };

// // export default HandleProducts;

// // import React, { useEffect, useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { addProduct, deleteProduct, editProduct, fetchProducts } from "../../features/productSlice";
// // import Modal from "./Modal";
// // import { toast, ToastContainer } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";
// // import "./admin.css";

// // const HandleProducts = () => {
// //     const dispatch = useDispatch();
// //     const { products, loading, error, totalProducts } = useSelector((state) => state.products);

// //     useEffect(() => {
// //         dispatch(fetchProducts({ page: 1, limit: 12, category: "all" }));
// //     }, [dispatch]);

// //     const [productData, setProductData] = useState({
// //         id: "",
// //         name: "",
// //         price: "",
// //         oldPrice: "",
// //         image: "",
// //         category: "",
// //         seller: "",
// //         stock: "",
// //     });
// //     const [viewMode, setViewMode] = useState("table");
// //     const [selectedCategory, setSelectedCategory] = useState("all");
// //     const [isModalOpen, setIsModalOpen] = useState(false);
// //     const [isEditing, setIsEditing] = useState(false);

// //     const handleInputChange = (e) => {
// //         const { name, value } = e.target;
// //         setProductData((prevData) => ({ ...prevData, [name]: value }));
// //     };

// //     const handleAddProduct = () => {
// //         setIsEditing(false);
// //         setProductData({
// //             id: "",
// //             name: "",
// //             price: "",
// //             oldPrice: "",
// //             image: "",
// //             category: "",
// //             seller: "",
// //             stock: "",
// //         });
// //         setIsModalOpen(true);
// //     };

// //     const handleSaveProduct = () => {
// //         if (productData.name && productData.price && productData.category && productData.seller) {
// //             if (isEditing) {
// //                 dispatch(editProduct(productData));
// //                 toast.success("Product updated successfully!");
// //             } else {
// //                 const newProduct = {
// //                     id: Date.now().toString(),
// //                     name: productData.name,
// //                     price: parseFloat(productData.price),
// //                     oldPrice: parseFloat(productData.oldPrice) || null,
// //                     image: productData.image,
// //                     category: productData.category,
// //                     seller: productData.seller,
// //                     stock: parseInt(productData.stock),
// //                 };
// //                 dispatch(addProduct(newProduct));
// //                 toast.success("Product added successfully!");
// //             }
// //             setIsModalOpen(false);
// //         } else {
// //             toast.error("Please fill in all required fields.");
// //         }
// //     };

// //     const handleDeleteProduct = (id) => {
// //         toast(
// //             ({ closeToast }) => (
// //                 <div className="productDeleteConfirm">
// //                     <p>Are you sure you want to delete this product?</p>
// //                     <div>
// //                         <button
// //                             onClick={() => {
// //                                 dispatch(deleteProduct(id));
// //                                 toast.success("Product deleted successfully!");
// //                                 closeToast();
// //                             }}
// //                             className="deleteconfirmButton"
// //                         >
// //                             Yes
// //                         </button>
// //                         <button onClick={closeToast} className="deletecancelButton">
// //                             No
// //                         </button>
// //                     </div>
// //                 </div>
// //             ),
// //             {
// //                 closeOnClick: false,
// //                 autoClose: false,
// //             }
// //         );
// //     };

// //     const handleEditProduct = (product) => {
// //         setIsEditing(true);
// //         setProductData({
// //             id: product.id,
// //             name: product.name,
// //             price: product.price,
// //             oldPrice: product.oldPrice,
// //             image: product.image,
// //             category: product.category,
// //             seller: product.seller,
// //             stock: product.stock,
// //         });
// //         setIsModalOpen(true);
// //     };

// //     const handleCategoryChange = (e) => {
// //         setSelectedCategory(e.target.value);
// //         dispatch(fetchProducts({ page: 1, limit: 12, category: e.target.value }));
// //     };

// //     return (
// //         <div className="handle-products">
// //             <div className="wrapHandleProductHead">
// //                 <h2>Handle Products</h2>
// //                 <button onClick={handleAddProduct} className="addEditbutton">
// //                     <span>Add Product</span>
// //                 </button>
// //             </div>

// //             {/* View & Category Filters */}
// //             <div className="view-switch">
// //                 <select onChange={(e) => setViewMode(e.target.value)} value={viewMode}>
// //                     <option value="table">Table</option>
// //                 </select>
// //                 <select onChange={handleCategoryChange} value={selectedCategory}>
// //                     <option value="all">All</option>
// //                     <option value="dog">Dog</option>
// //                     <option value="cat">Cat</option>
// //                 </select>
// //             </div>

// //             {/* Products Table */}
// //             <div className="productsListing">
// //                 <h2>Current Products</h2>
// //                 {loading ? (
// //                     <p>Loading products...</p>
// //                 ) : error ? (
// //                     <p className="error">Error: {error}</p>
// //                 ) : (
// //                     <table className="product-table">
// //                         <thead>
// //                             <tr>
// //                                 <th>Name</th>
// //                                 <th>Price</th>
// //                                 <th>Old Price</th>
// //                                 <th>Image</th>
// //                                 <th>Category</th>
// //                                 <th>Stock</th>
// //                                 <th>Seller</th>
// //                                 <th>Actions</th>
// //                             </tr>
// //                         </thead>
// //                         <tbody>
// //                             {products.slice().reverse().map((product) => (
// //                                 <tr key={product.id}>
// //                                     <td>{product.name}</td>
// //                                     <td>${product.price.toFixed(2)}</td>
// //                                     <td>${product.oldPrice}</td>
// //                                     <td>
// //                                         <img src={product.image} alt={product.name} style={{ width: "50px" }} />
// //                                     </td>
// //                                     <td>{product.category}</td>
// //                                     <td>{product.stock}</td>
// //                                     <td>{product.seller}</td>
// //                                     <td>
// //                                         <button onClick={() => handleEditProduct(product)}>Edit</button>
// //                                         <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
// //                                     </td>
// //                                 </tr>
// //                             ))}
// //                         </tbody>
// //                     </table>
// //                 )}
// //             </div>

// //             {/* Modal for Adding/Editing Products */}
// //             <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
// //                 <div className="product-form">
// //                     <h3>{isEditing ? "Edit Product" : "Add New Product"}</h3>
// //                     <input
// //                         type="text"
// //                         name="name"
// //                         placeholder="Product Name"
// //                         value={productData.name}
// //                         onChange={handleInputChange}
// //                     />
// //                     <input
// //                         type="number"
// //                         name="price"
// //                         placeholder="Product Price"
// //                         value={productData.price}
// //                         onChange={handleInputChange}
// //                     />
// //                     <input
// //                         type="number"
// //                         name="oldPrice"
// //                         placeholder="Old Price"
// //                         value={productData.oldPrice}
// //                         onChange={handleInputChange}
// //                     />
// //                     <input
// //                         type="text"
// //                         name="image"
// //                         placeholder="Image URL"
// //                         value={productData.image}
// //                         onChange={handleInputChange}
// //                     />
// //                     <input
// //                         type="file"
// //                         name="imageFile"
// //                         accept="image/*"
// //                         onChange={(e) => {
// //                             const file = e.target.files[0];
// //                             if (file) {
// //                                 const reader = new FileReader();
// //                                 reader.onloadend = () => {
// //                                     setProductData((prevData) => ({ ...prevData, image: reader.result }));
// //                                 };
// //                                 reader.readAsDataURL(file);
// //                             }
// //                         }}
// //                     />
// //                     <input
// //                         type="text"
// //                         name="category"
// //                         placeholder="Category"
// //                         value={productData.category}
// //                         onChange={handleInputChange}
// //                     />
// //                     <input
// //                         type="number"
// //                         name="stock"
// //                         placeholder="Stock"
// //                         value={productData.stock}
// //                         onChange={handleInputChange}
// //                     />
// //                     <input
// //                         type="text"
// //                         name="seller"
// //                         placeholder="Seller"
// //                         value={productData.seller}
// //                         onChange={handleInputChange}
// //                     />
// //                     <button onClick={handleSaveProduct}>{isEditing ? "Update" : "Add"}</button>
// //                 </div>
// //             </Modal>
// //             <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={true} />
// //         </div>
// //     );
// // };

// // export default HandleProducts;

// // import React, { useEffect, useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { addProduct, deleteProduct, editProduct, fetchProducts } from "../../features/productSlice";
// // import Modal from "./Modal";
// // import { toast, ToastContainer } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";
// // import "./admin.css";

// // const HandleProducts = () => {
// //     const dispatch = useDispatch();
// //     const { products, loading, error } = useSelector((state) => state.products);

// //     useEffect(() => {
// //         dispatch(fetchProducts({ page: 1, limit: 12, category: "" }));
// //     }, [dispatch]);

// //     console.log(products);

// //     const [productData, setProductData] = useState({
// //         id: "",
// //         name: "",
// //         price: "",
// //         oldPrice: "",
// //         image: "",
// //         category: "",
// //         seller: "",
// //         stock: "",
// //     });
// //     const [selectedCategory, setSelectedCategory] = useState("");
// //     const [isModalOpen, setIsModalOpen] = useState(false);
// //     const [isEditing, setIsEditing] = useState(false);

// //     const handleInputChange = (e) => {
// //         const { name, value } = e.target;
// //         setProductData((prevData) => ({ ...prevData, [name]: value }));
// //     };

// //     const handleAddProduct = () => {
// //         setIsEditing(false);
// //         setProductData({
// //             id: "",
// //             name: "",
// //             price: "",
// //             oldPrice: "",
// //             image: "",
// //             category: "",
// //             seller: "",
// //             stock: "",
// //         });
// //         setIsModalOpen(true);
// //     };

// //     const handleSaveProduct = () => {
// //         if (productData.name && productData.price && productData.category && productData.seller) {
// //             if (isEditing) {
// //                 dispatch(editProduct(productData));
// //                 toast.success("Product updated successfully!");
// //             } else {
// //                 const newProduct = {
// //                     id: Date.now().toString(),
// //                     name: productData.name,
// //                     price: parseFloat(productData.price),
// //                     oldPrice: parseFloat(productData.oldPrice) || null,
// //                     image: productData.image,
// //                     category: productData.category,
// //                     seller: productData.seller,
// //                     stock: parseInt(productData.stock),
// //                 };
// //                 dispatch(addProduct(newProduct));
// //                 toast.success("Product added successfully!");
// //             }
// //             setIsModalOpen(false);
// //         } else {
// //             toast.error("Please fill in all required fields.");
// //         }
// //     };

// //     const handleDeleteProduct = (id) => {
// //         toast(
// //             ({ closeToast }) => (
// //                 <div className="productDeleteConfirm">
// //                     <p>Are you sure you want to delete this product?</p>
// //                     <div>
// //                         <button
// //                             onClick={() => {
// //                                 dispatch(deleteProduct(id));
// //                                 toast.success("Product deleted successfully!");
// //                                 closeToast();
// //                             }}
// //                             className="deleteconfirmButton"
// //                         >
// //                             Yes
// //                         </button>
// //                         <button onClick={closeToast} className="deletecancelButton">
// //                             No
// //                         </button>
// //                     </div>
// //                 </div>
// //             ),
// //             {
// //                 closeOnClick: false,
// //                 autoClose: false,
// //             }
// //         );
// //     };

// //     const handleEditProduct = (product) => {
// //         setIsEditing(true);
// //         setProductData({
// //             id: product.id,
// //             name: product.name,
// //             price: product.price,
// //             oldPrice: product.oldPrice,
// //             image: product.image,
// //             category: product.category,
// //             seller: product.seller,
// //             stock: product.stock,
// //         });
// //         setIsModalOpen(true);
// //     };

// //     const handleCategoryChange = (e) => {
// //         setSelectedCategory(e.target.value);
// //         dispatch(fetchProducts({ page: 1, limit: 12, category: e.target.value }));
// //     };

// //     return (
// //         <div className="handle-products">
// //             <div className="wrapHandleProductHead">
// //                 <h2>Handle Products</h2>
// //                 <div className="wrapAddBtnandCard">
// //                   <div className="Admincard">
// //                          <div className="Cardcontent">
// //                              <h3 className="Cardheading">Product Overview</h3>
// //                              <p>
// //                                  <strong>Total Products: </strong>
// //                                  {/* {totalProducts} */}12
// //                              </p>
// //                              <p>
// //                                  <strong>Cat Products: </strong>
// //                                  {/* {catProducts} */}12
// //                              </p>
// //                              <p>
// //                                  <strong>Dog Products: </strong>
// //                                  {/* {dogProducts} */}12
// //                              </p>
// //                          </div>
// //                      </div>
// //                 <button onClick={handleAddProduct} className="addEditbutton">
// //                     <span>Add Product</span>
// //                 </button>
// //                   <div className="Admincard">
// //                          <div className="Cardcontent">
// //                              <h3 className="Cardheading">Product Overview</h3>
// //                              <p>
// //                                  <strong>Total Products: </strong>
// //                                  {/* {totalProducts} */}12
// //                              </p>
// //                              <p>
// //                                  <strong>Cat Products: </strong>
// //                                  {/* {catProducts} */}12
// //                              </p>
// //                              <p>
// //                                  <strong>Dog Products: </strong>
// //                                  {/* {dogProducts} */}12
// //                              </p>
// //                          </div>
// //                   </div>
// //                   </div>
// //             </div>

// //             {/* Category Filter */}
// //             <div className="view-switch">
// //                 <select onChange={handleCategoryChange} value={selectedCategory}>
// //                     <option value="all">All</option>
// //                     <option value="dog">Dog</option>
// //                     <option value="cat">Cat</option>
// //                 </select>
// //             </div>

// //             {/* Products Table */}
// //             <div className="productsListing">
// //                 <h2>Current Products</h2>
// //                 {loading ? (
// //                     <p>Loading products...</p>
// //                 ) : error ? (
// //                     <p className="error">Error: {error}</p>
// //                 ) : (
// //                     <table className="product-table">
// //                         <thead>
// //                             <tr>
// //                                 <th>Name</th>
// //                                 <th>Price</th>
// //                                 <th>Old Price</th>
// //                                 <th>Image</th>
// //                                 <th>Category</th>
// //                                 <th>Stock</th>
// //                                 <th>Seller</th>
// //                                 <th>Incredients</th>
// //                                 <th>Actions</th>
// //                             </tr>
// //                         </thead>
// //                         <tbody>
// //                             {products.slice().reverse().map((product) => (
// //                                 <tr key={product.id}>
// //                                     <td>{product.name}</td>
// //                                     <td>${product.price.toFixed(2)}</td>
// //                                     <td>${product.oldPrice}</td>
// //                                     <td>
// //                                         <img src={product.image} alt={product.name} style={{ width: "50px" }} />
// //                                     </td>
// //                                     <td>{product.category}</td>
// //                                     <td>{product.stock}</td>
// //                                     <td>{product.description}</td>
// //                                     <td>{product.ingredients}</td>
// //                                     <td>
// //                                     <div className="productActions">
// //                                         <button onClick={() => handleEditProduct(product)}>Edit</button>
// //                                         <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
// //                                     </div>
// //                                     </td>
// //                                 </tr>
// //                             ))}
// //                         </tbody>
// //                     </table>
// //                 )}
// //             </div>

// //             {/* Modal for Adding/Editing Products */}
// //             <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
// //                 <div className="product-form">
// //                     <h3>{isEditing ? "Edit Product" : "Add New Product"}</h3>
// //                     <input
// //                         type="text"
// //                         name="name"
// //                         placeholder="Product Name"
// //                         value={productData.name}
// //                         onChange={handleInputChange}
// //                     />
// //                     <input
// //                         type="number"
// //                         name="price"
// //                         placeholder="Product Price"
// //                         value={productData.price}
// //                         onChange={handleInputChange}
// //                     />
// //                     <input
// //                         type="number"
// //                         name="oldPrice"
// //                         placeholder="Old Price"
// //                         value={productData.oldPrice}
// //                         onChange={handleInputChange}
// //                     />
// //                     <input
// //                         type="text"
// //                         name="image"
// //                         placeholder="Image URL"
// //                         value={productData.image}
// //                         onChange={handleInputChange}
// //                     />
// //                     <input
// //                         type="file"
// //                         name="imageFile"
// //                         accept="image/*"
// //                         onChange={(e) => {
// //                             const file = e.target.files[0];
// //                             if (file) {
// //                                 const reader = new FileReader();
// //                                 reader.onloadend = () => {
// //                                     setProductData((prevData) => ({ ...prevData, image: reader.result }));
// //                                 };
// //                                 reader.readAsDataURL(file);
// //                             }
// //                         }}
// //                     />
// //                     <input
// //                         type="text"
// //                         name="category"
// //                         placeholder="Category"
// //                         value={productData.category}
// //                         onChange={handleInputChange}
// //                     />
// //                     <input
// //                         type="number"
// //                         name="stock"
// //                         placeholder="Stock"
// //                         value={productData.stock}
// //                         onChange={handleInputChange}
// //                     />
// //                     <input
// //                         type="text"
// //                         name="seller"
// //                         placeholder="Seller"
// //                         value={productData.seller}
// //                         onChange={handleInputChange}
// //                     />
// //                     <button onClick={handleSaveProduct}>{isEditing ? "Update" : "Add"}</button>
// //                 </div>
// //             </Modal>
// //             <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={true} />
// //         </div>
// //     );
// // };

// // export default HandleProducts;

// // import React, { useEffect, useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { addProduct, deleteProduct, editProduct, fetchProducts } from "../../features/productSlice";
// // import Modal from "./Modal";
// // import { toast, ToastContainer } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";
// // import "./admin.css";

// // const HandleProducts = () => {
// //     const dispatch = useDispatch();
// //     const { products, loading, error } = useSelector((state) => state.products);

// //     // State for pagination
// //     const [page, setPage] = useState(1);
// //     const [isScrolling, setIsScrolling] = useState(false);

// //     useEffect(() => {
// //         dispatch(fetchProducts({ page, limit: 12, category: "" }));
// //     }, [dispatch, page]);

// //     const [productData, setProductData] = useState({
// //         id: "",
// //         name: "",
// //         price: "",
// //         oldPrice: "",
// //         image: "",
// //         category: "",
// //         seller: "",
// //         stock: "",
// //     });
// //     const [selectedCategory, setSelectedCategory] = useState("");
// //     const [isModalOpen, setIsModalOpen] = useState(false);
// //     const [isEditing, setIsEditing] = useState(false);

// //     const handleInputChange = (e) => {
// //         const { name, value } = e.target;
// //         setProductData((prevData) => ({ ...prevData, [name]: value }));
// //     };

// //     const handleAddProduct = () => {
// //         setIsEditing(false);
// //         setProductData({
// //             id: "",
// //             name: "",
// //             price: "",
// //             oldPrice: "",
// //             image: "",
// //             category: "",
// //             seller: "",
// //             stock: "",
// //         });
// //         setIsModalOpen(true);
// //     };

// //     const handleSaveProduct = () => {
// //         if (productData.name && productData.price && productData.category && productData.seller) {
// //             if (isEditing) {
// //                 dispatch(editProduct(productData));
// //                 toast.success("Product updated successfully!");
// //             } else {
// //                 const newProduct = {
// //                     id: Date.now().toString(),
// //                     name: productData.name,
// //                     price: parseFloat(productData.price),
// //                     oldPrice: parseFloat(productData.oldPrice) || null,
// //                     image: productData.image,
// //                     category: productData.category,
// //                     seller: productData.seller,
// //                     stock: parseInt(productData.stock),
// //                 };
// //                 dispatch(addProduct(newProduct));
// //                 toast.success("Product added successfully!");
// //             }
// //             setIsModalOpen(false);
// //         } else {
// //             toast.error("Please fill in all required fields.");
// //         }
// //     };

// //     const handleDeleteProduct = (id) => {
// //         toast(
// //             ({ closeToast }) => (
// //                 <div className="productDeleteConfirm">
// //                     <p>Are you sure you want to delete this product?</p>
// //                     <div>
// //                         <button
// //                             onClick={() => {
// //                                 dispatch(deleteProduct(id));
// //                                 toast.success("Product deleted successfully!");
// //                                 closeToast();
// //                             }}
// //                             className="deleteconfirmButton"
// //                         >
// //                             Yes
// //                         </button>
// //                         <button onClick={closeToast} className="deletecancelButton">
// //                             No
// //                         </button>
// //                     </div>
// //                 </div>
// //             ),
// //             {
// //                 closeOnClick: false,
// //                 autoClose: false,
// //             }
// //         );
// //     };

// //     const handleEditProduct = (product) => {
// //         setIsEditing(true);
// //         setProductData({
// //             id: product.id,
// //             name: product.name,
// //             price: product.price,
// //             oldPrice: product.oldPrice,
// //             image: product.image,
// //             category: product.category,
// //             seller: product.seller,
// //             stock: product.stock,
// //         });
// //         setIsModalOpen(true);
// //     };

// //     const handleCategoryChange = (e) => {
// //         setSelectedCategory(e.target.value);
// //         dispatch(fetchProducts({ page: 1, limit: 12, category: e.target.value }));
// //     };

// //     // Handle scroll to fetch more products
// //     const handleScroll = (e) => {
// //         const bottom = e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
// //         if (bottom && !isScrolling && !loading) {
// //             setIsScrolling(true);
// //             setPage((prevPage) => prevPage + 1);
// //         }
// //     };

// //     return (
// //         <div className="handle-products">
// //             <div className="wrapHandleProductHead">
// //                 <h2>Handle Products</h2>
// //                 <div className="wrapAddBtnandCard">
// //                   <div className="Admincard">
// //                          <div className="Cardcontent">
// //                              <h3 className="Cardheading">Product Overview</h3>
// //                              <p>
// //                                  <strong>Total Products: </strong>
// //                                  {/* {totalProducts} */}12
// //                              </p>
// //                              <p>
// //                                  <strong>Cat Products: </strong>
// //                                  {/* {catProducts} */}12
// //                              </p>
// //                              <p>
// //                                  <strong>Dog Products: </strong>
// //                                  {/* {dogProducts} */}12
// //                              </p>
// //                          </div>
// //                      </div>
// //                 <button onClick={handleAddProduct} className="addEditbutton">
// //                     <span>Add Product</span>
// //                 </button>
// //                   <div className="Admincard">
// //                          <div className="Cardcontent">
// //                              <h3 className="Cardheading">Product Overview</h3>
// //                              <p>
// //                                  <strong>Total Products: </strong>
// //                                  {/* {totalProducts} */}12
// //                              </p>
// //                              <p>
// //                                  <strong>Cat Products: </strong>
// //                                  {/* {catProducts} */}12
// //                              </p>
// //                              <p>
// //                                  <strong>Dog Products: </strong>
// //                                  {/* {dogProducts} */}12
// //                              </p>
// //                          </div>
// //                   </div>
// //                   </div>
// //             </div>

// //             {/* Category Filter */}
// //             <div className="view-switch">
// //                 <select onChange={handleCategoryChange} value={selectedCategory}>
// //                     <option value="">All</option>
// //                     <option value="dog">Dog</option>
// //                     <option value="cat">Cat</option>
// //                 </select>
// //             </div>

// //             {/* Products Table */}
// //             <div className="productsListing" onScroll={handleScroll}>
// //                 <h2>Current Products</h2>
// //                 {loading ? (
// //                     <p>Loading products...</p>
// //                 ) : error ? (
// //                     <p className="error">Error: {error}</p>
// //                 ) : (
// //                     <table className="product-table">
// //                         <thead>
// //                             <tr>
// //                                 <th>Name</th>
// //                                 <th>Price</th>
// //                                 <th>Old Price</th>
// //                                 <th>Image</th>
// //                                 <th>Category</th>
// //                                 <th>Stock</th>
// //                                 <th>Seller</th>
// //                                 <th>Incredients</th>
// //                                 <th>Actions</th>
// //                             </tr>
// //                         </thead>
// //                         <tbody>
// //                             {products.slice().reverse().map((product) => (
// //                                 <tr key={product.id}>
// //                                     <td>{product.name}</td>
// //                                     <td>${product.price.toFixed(2)}</td>
// //                                     <td>${product.oldPrice}</td>
// //                                     <td>
// //                                         <img src={product.image} alt={product.name} style={{ width: "50px" }} />
// //                                     </td>
// //                                     <td>{product.category}</td>
// //                                     <td>{product.stock}</td>
// //                                     <td>{product.description}</td>
// //                                     <td>{product.ingredients}</td>
// //                                     <td>
// //                                     <div className="productActions">
// //                                         <button onClick={() => handleEditProduct(product)}>Edit</button>
// //                                         <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
// //                                     </div>
// //                                     </td>
// //                                 </tr>
// //                             ))}
// //                         </tbody>
// //                     </table>
// //                 )}
// //             </div>

// //             {/* Modal for Adding/Editing Products */}
// //             <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
// //                 <div className="product-form">
// //                     <h3>{isEditing ? "Edit Product" : "Add New Product"}</h3>
// //                     <input
// //                         type="text"
// //                         name="name"
// //                         placeholder="Product Name"
// //                         value={productData.name}
// //                         onChange={handleInputChange}
// //                     />
// //                     <input
// //                         type="number"
// //                         name="price"
// //                         placeholder="Product Price"
// //                         value={productData.price}
// //                         onChange={handleInputChange}
// //                     />
// //                     <input
// //                         type="number"
// //                         name="oldPrice"
// //                         placeholder="Old Price"
// //                         value={productData.oldPrice}
// //                         onChange={handleInputChange}
// //                     />
// //                     <input
// //                         type="text"
// //                         name="image"
// //                         placeholder="Image URL"
// //                         value={productData.image}
// //                         onChange={handleInputChange}
// //                     />
// //                     <input
// //                         type="file"
// //                         name="imageFile"
// //                         accept="image/*"
// //                         onChange={(e) => {
// //                             const file = e.target.files[0];
// //                             if (file) {
// //                                 const reader = new FileReader();
// //                                 reader.onloadend = () => {
// //                                     setProductData((prevData) => ({ ...prevData, image: reader.result }));
// //                                 };
// //                                 reader.readAsDataURL(file);
// //                             }
// //                         }}
// //                     />
// //                     <input
// //                         type="text"
// //                         name="category"
// //                         placeholder="Category"
// //                         value={productData.category}
// //                         onChange={handleInputChange}
// //                     />
// //                     <input
// //                         type="number"
// //                         name="stock"
// //                         placeholder="Stock"
// //                         value={productData.stock}
// //                         onChange={handleInputChange}
// //                     />
// //                     <input
// //                         type="text"
// //                         name="seller"
// //                         placeholder="Seller"
// //                         value={productData.seller}
// //                         onChange={handleInputChange}
// //                     />
// //                     <button onClick={handleSaveProduct}>{isEditing ? "Update" : "Add"}</button>
// //                 </div>
// //             </Modal>
// //             <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={true} />
// //         </div>
// //     );
// // };

// // export default HandleProducts;



import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, deleteProduct, editProduct, fetchProducts } from "../../features/productSlice";
import Modal from "./Modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./admin.css";

const HandleProducts = () => {
    const dispatch = useDispatch();
    const { products, loading, total } = useSelector((state) => state.products);

    // State for pagination
    const [ page, setPage ] = useState(1);
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ isEditing, setIsEditing ] = useState(false);

    const [ selectedCategory, setSelectedCategory ] = useState("");
    const [ searchTerm, setSearchTerm ] = useState()
    const [ suggestions, setSuggestions ] = useState("")

    useEffect(() => {
        dispatch(fetchProducts({ page, limit: 12, category: selectedCategory }));
    }, [dispatch, page, selectedCategory]);

    console.log(total);

    const [productData, setProductData] = useState({
        id: "",
        name: "",
        price: "",
        oldPrice: "",
        image: "",
        category: "",
        seller: "",
        stock: "",
        description: "",
        ingredients: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleAddProduct = () => {
        setIsEditing(false);
        setProductData({
            id: "",
            name: "",
            price: "",
            oldPrice: "",
            image: "",
            category: "",
            seller: "",
            stock: "",
            description: "",
            ingredients: "",
        });
        setIsModalOpen(true);
    };

    const handleSaveProduct = () => {
        if (productData.name && productData.price && productData.category && productData.seller && productData.image) {
            if (isEditing) {
                const updatedProduct = { ...productData }; // Copy all fields
                dispatch(editProduct({ productId: updatedProduct.id, updateData: updatedProduct })).then((response) => {
                    dispatch(fetchProducts({ page, limit: 12, category: selectedCategory }));
                });
                toast.success("Product updated successfully!");
            } else {
                const newProduct = {
                    name: productData.name,
                    price: parseFloat(productData.price),
                    oldPrice: parseFloat(productData.oldPrice) || null,
                    image: productData.image,
                    category: productData.category,
                    seller: productData.seller,
                    stock: parseInt(productData.stock),
                    description: productData.description,
                    ingredients: productData.ingredients,
                };
                dispatch(addProduct(newProduct))
                    .unwrap()
                    .then((response) => {
                        toast.success("Product added successfully!");
                    })
                    .catch((error) => {
                        toast.error(error);
                    });
            }
            setIsModalOpen(false);
        } else {
            toast.error("Please fill in all required fields.");
        }
    };

    const handleDeleteProduct = (id) => {
        toast(
            ({ closeToast }) => (
                <div className="productDeleteConfirm">
                    <p>Are you sure you want to delete this product?</p>
                    <div>
                        <button
                            onClick={() => {
                                console.log(id);

                                dispatch(deleteProduct(id)).then((response) => {
                                    dispatch(fetchProducts({ page, limit: 12, category: selectedCategory }));
                                });
                                toast.success("Product deleted successfully!");
                                closeToast();
                            }}
                            className="deleteconfirmButton"
                        >
                            Yes
                        </button>
                        <button onClick={closeToast} className="deletecancelButton">
                            No
                        </button>
                    </div>
                </div>
            ),
            {
                closeOnClick: false,
                autoClose: false,
            }
        );
    };

    const handleEditProduct = (product) => {
        setIsEditing(true);
        setProductData({
            id: product._id,
            name: product.name,
            price: product.price,
            oldPrice: product.oldPrice,
            image: product.image,
            category: product.category,
            seller: product.seller,
            stock: product.stock,
            description: product.description,
            ingredients: product.ingredients,
        });
        setIsModalOpen(true);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        dispatch(fetchProducts({ page: 1, limit: 12, category: e.target.value }));
    };

    // Handle page navigation
    const handleNextPage = () => {
        if (page < Math.ceil(total / 12)) {
            setPage(page + 1);
        }
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setProductData((prevData) => ({
            ...prevData,
            image: file,
        }));
    };

    const catProducts = products.filter((product) => product.category === "cat");
    const dogProducts = products.filter((product) => product.category === "dog");



//search
     const debounce = (func, delay) => {
            let timeout;
            return (...args) => {
              clearTimeout(timeout);
              timeout = setTimeout(() => func(...args), delay);
            };
          };
    
        const searchProducts = debounce((searchValue) => {
            dispatch(fetchProducts({ name: searchValue, page: 1, limit: 12 }));
        }, 400);
    
    
        const handleSearch = (e) => {
            const searchValue = e.target.value.toLowerCase();
            setSearchTerm(searchValue);
    
            if (searchValue.length > 0) {
                const filteredSuggestions = products.filter(
                    (product) =>
                        product.name.toLowerCase().includes(searchValue) || product.category.toLowerCase().includes(searchValue)
                );
                setSuggestions(filteredSuggestions);
                searchProducts(searchValue);
            } else {
                setSuggestions([]);
                dispatch(fetchProducts({ page: 1, limit: 12, category: null }));
            }
        }

    
        const handleSuggestionClick = (suggestion) => {
            setSearchTerm(suggestion.name.toLowerCase());
        };
    
        const handleBlur = () => {
            setSuggestions([]);
        };


    return (
        <div className="handle-products">
            <div className="wrapAddBtnandCard">
                <div className="Admincard">
                    <div className="Cardcontent">
                        <h3 className="Cardheading">Product Overview (page wise)</h3>
                        <p>
                            <strong>Total Products: </strong>
                            {total}
                        </p>
                        <p>
                            <strong>Cat Products:</strong>
                            {catProducts.length}
                        </p>
                        <p>
                            <strong>Dog Products: </strong>
                            {dogProducts.length}
                        </p>
                    </div>
                </div>
                <button onClick={handleAddProduct} className="addEditbutton">
                    <span>Add Product</span>
                </button>
                <div className="Admincard">
                    <div className="Cardcontent">
                        <h4 className="Cardheading">Seller Overview</h4>
                        <p>
                            <strong>Total Sellers: </strong>
                            28
                        </p>
                        <p>
                            <strong>Cat: </strong>
                            11
                        </p>
                        <p>
                            <strong>Dog: </strong>
                            17
                        </p>
                    </div>
                </div>
            </div>

            {/* Category Filter */}
            <div className="viewAndSearch">
            <div className="adminSearchProducts view-switch">
                    <input type="text" onBlur={handleBlur} placeholder="Search for products..." onChange={handleSearch}></input>
                    {suggestions.length > 0 && (
                        <ul className="suggestions-list suggestions-list-admin">
                            {suggestions.map((suggestion) => (
                                <li key={suggestion._id || suggestion.name} onClick={() => handleSuggestionClick(suggestion)}>
                                    {suggestion.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="view-switch">
                    <select onChange={handleCategoryChange} value={selectedCategory}>
                        <option value="">All</option>
                        <option value="dog">Dog</option>
                        <option value="cat">Cat</option>
                    </select>
                </div>
            </div>

            {/* Products Table */}
            <div className="productsListing">
                <h2>Current Products</h2>
                {loading ? (
                    <p>Loading products...</p>
                ) : (
                    <table className="product-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Old Price</th>
                                <th>Image</th>
                                <th>Category</th>
                                <th>Stock</th>
                                <th>Seller</th>
                                <th>Description</th>
                                <th>Ingredients</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products
                                .slice()
                                .reverse()
                                .map((product) => (
                                    <tr key={product.id}>
                                        <td>{product.name}</td>
                                        <td>₹{product.price.toFixed(2)}</td>
                                        <td>₹{product.oldPrice}</td>
                                        <td>
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                style={{ width: "70px", height: "60px" }}
                                            />
                                        </td>
                                        <td>{product.category}</td>
                                        <td>{product.stock}</td>
                                        <td>{product.seller}</td>
                                        <td>{product.description}</td>
                                        <td>{product.ingredients}</td>
                                        <td>
                                            <div className="productActions">
                                                <button onClick={() => handleEditProduct(product)}>Edit</button>
                                                <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                )}
                <div className="pagination-controls paginationInAdminProducts">
                    <button onClick={handlePreviousPage} disabled={page === 1} className="pagination-btn">
                        Previous
                    </button>
                    <button onClick={handleNextPage} disabled={page === Math.ceil(total / 12)} className="pagination-btn">
                        Next
                    </button>
                </div>
            </div>

            {/* Modal for Adding/Editing Products */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="product-form">
                    <div>
                        <h3>{isEditing ? "Edit Product" : "Add New Product"}</h3>
                    </div>
                    <div className="productFieldContainer">
                        <div className="productField">
                            <label>Product Name</label>
                            <input type="text" name="name" value={productData.name} onChange={handleInputChange} />
                        </div>
                        <div className="productField">
                            <label>Price</label>
                            <input type="number" name="price" value={productData.price} onChange={handleInputChange} />
                        </div>
                        <div className="productField">
                            <label>Old Price</label>
                            <input
                                type="number"
                                name="oldPrice"
                                value={productData.oldPrice}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="productField">
                            <label>Upload Image</label>
                            <input type="file" name="imageFile" accept="image/*" onChange={handleFileChange} />
                        </div>
                    </div>

                    <div className="productFieldContainer">
                        <div className="productField">
                            <label>Category</label>
                            <select name="category" value={productData.category} onChange={handleInputChange}>
                                <option value="">Select Category</option>
                                <option value="cat">Cat</option>
                                <option value="dog">Dog</option>
                            </select>
                        </div>
                        <div className="productField">
                            <label>Stock</label>
                            <input type="number" name="stock" value={productData.stock} onChange={handleInputChange} />
                        </div>
                        <div className="productField">
                            <label>Seller</label>
                            <input type="text" name="seller" value={productData.seller} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="productFieldContainer">
                        <div className="productFieldINCDES">
                            <label>Description</label>
                            <textarea name="description" value={productData.description} onChange={handleInputChange} />
                        </div>
                        <div className="productFieldINCDES">
                            <label>Ingredients</label>
                            <textarea name="ingredients" value={productData.ingredients} onChange={handleInputChange} />
                        </div>
                    </div>
                    <button className="addEditbutton updateBtn" onClick={handleSaveProduct}>
                        {isEditing ? "Update" : "Add"}
                    </button>
                </div>
            </Modal>
            <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={true} />
        </div>
    );
};

export default HandleProducts;
