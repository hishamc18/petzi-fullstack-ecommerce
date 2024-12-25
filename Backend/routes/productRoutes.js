const express = require('express');
const { protect, isAdmin } = require('../middlewares/authMiddleware')
const productController = require('../controllers/productController');
const upload = require('../middlewares/uploadMiddleware')

const router = express.Router();

// get services for user
router.get('/products', productController.getproduct);
router.get('/products/:id', productController.getproduct);

//product services for admin
router.post('/addProduct', protect, isAdmin, upload.single('image'), productController.addProduct)
router.delete('/deleteProduct/:productId', protect, isAdmin, productController.deleteProduct)
router.put('/editProduct/:productId', protect, isAdmin, productController.editProduct)

module.exports = router;