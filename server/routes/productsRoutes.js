import express from 'express';

import { addProduct, getAllProducts, getProductById, deleteProduct, updateProduct } from '../controllers/products.Controller.js';
const router = express.Router();

router.post('/addProduct', addProduct);
router.get('/getAllProducts', getAllProducts);
router.get('/getProductById', getProductById);
router.delete('/deleteProduct/:id', deleteProduct);
router.put('/updateProduct/:id', updateProduct);


export default router;