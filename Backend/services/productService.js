const Product = require('../models/productModel');
const CustomError = require('../utils/customError');
const mongoose = require('mongoose')

// get product servoce (id/category/all)
exports.getProductsService = async ({ id, category, page, limit, name }) => {
    const skip = (page - 1) * limit;

    limit = limit

    let match = { isDeleted: false };

    //search based on name
    if (name) {
        match.name = { $regex: name, $options: 'i' };
    }

    if (category) {
        match.category = { $regex: category, $options: 'i' }; // Case-insensitive match
    }

    //product id
    if (id) {
        match._id = new mongoose.Types.ObjectId(id);
    }

    //aggregation pipeline
    const pipeline = [
        { $match: match },
        { $skip: skip },
        { $limit: limit },
    ];

    const products = await Product.aggregate(pipeline);

    // If 'id' is provided, return the product directly
    if (id && products.length === 0) {
        throw new CustomError('Product not found or is deleted', 404);
    }

    // If no id is provided, return all matching products
    const total = await Product.countDocuments({ isDeleted: false, ...match });
    return { products, total };
};

//add a product
exports.addProduct = async (productData) => {
  const existingProduct = await Product.findOne({ name: productData.name });
  if (existingProduct) {
    throw new CustomError('Product already exists', 400);
  }

  const product = await Product.create(productData);
  return product;
};


  
//delete a product (soft delete)
exports.deleteProduct = async (productId) => {
    const product = await Product.findByIdAndUpdate(
      productId,
      { isDeleted: true },
      { new: true }
    );
    if (!product) {
      throw new CustomError('Product not found', 404);
    }
    return product;
  };


// Update a product by ID
exports.editProduct = async (productId, updateData) => {    
    const product = await Product.findByIdAndUpdate(
      { _id: productId, isDeleted: false },
      { $set: { ...updateData }},
      { new: true }
    );
    if (!product) {
      throw new CustomError('Product not found or deleted', 404);
    }
    return product;
  };