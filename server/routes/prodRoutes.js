import express from 'express';

import { addProduct, getAllProducts, deleteProduct, updateProduct } from '../controllers/prodController.js';
const router = express.Router();

router.post('/addProduct', addProduct)
router.get('/getAllProducts', getAllProducts)
router.delete('/deleteProduct/:id', deleteProduct);
router.put('/updateProduct/:id', updateProduct);


export default router;