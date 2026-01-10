import express from 'express';

import { addProduct, getAllProducts, getProductById, deleteProduct, updateProduct } from '../controllers/products.Controller.js';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.post('/addProduct', protect, adminOnly, addProduct);

router.get('/getAllProducts', protect, getAllProducts);

router.get('/getProductById', protect, getProductById);

router.delete('/deleteProduct/:id', protect, adminOnly, deleteProduct);

router.put('/updateProduct/:id', protect, adminOnly, updateProduct);


export default router;