import express from 'express';

import { addCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory} from '../controllers/categories.Controller.js';
const router = express.Router();

router.post('/addCategory',addCategory);
router.get('/getAllCategories', getAllCategories);
router.get('/getCategoryById', getCategoryById);
router.put('/updateCategory', updateCategory);
router.delete('/deleteCategory', deleteCategory);





export default router;